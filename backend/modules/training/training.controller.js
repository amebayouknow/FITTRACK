const db = require("../../database/db");

// exports.addTraining = async (req, res) => {
//   const { user_id, date, duration, exercises } = req.body;

//   let response = {
//     message: "Training created",
//     success: true,
//     body: null,
//     status: 200,
//   };

//   try {
//     // validation
//     if (!user_id || !date || !exercises || exercises.length === 0) {
//       response.status = 400;
//       response.success = false;
//       response.message = "Не заполнены обязательные поля";
//       throw new Error();
//     }

//     const sql =
//       "INSERT INTO training (user_id, date, duration, creation_date, update_date) VALUES (?, ?, ?, NOW(), NOW())";

//     const values = [user_id, date, duration];

//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.log("error", err);
//         response.status = 500;
//         response.success = false;
//         response.message = "Server Error";
//         return res.status(response.status).json(response);
//       }

//       const training_id = result.insertId;

//       // добавляем упражнения
//       exercises.forEach((exercise) => {
//         const exerciseSql =
//           "INSERT INTO exersice (training_id, category_id, parameters, duration) VALUES ( ?, ?, ?, ? )";

//         const exerciseValues = [
//           training_id,
//           exercise.category_id,
//           exercise.parameters,
//           exercise.duration,
//         ];

//         db.query(exerciseSql, exerciseValues, (err) => {
//           if (err) {
//             console.log("exercise error", err);
//           }
//         });
//       });

//       response.body = { training_id };

//       return res.status(response.status).json(response);
//     });
//   } catch (err) {
//     console.log(err);

//     if (response.message == "Training created") {
//       response.message = "Server Error";
//       response.status = 500;
//     }

//     return res.status(response.status).json(response);
//   }
// };

exports.addTraining = async (req, res) => {
  const { user_id, date, duration, exercises } = req.body;
  console.log("test")
  let response = {
    message: "Training created",
    success: true,
    body: null,
    status: 200,
  };

  try {
    // валидация
    if (!user_id || !date || !exercises || exercises.length === 0) {
      response.status = 400;
      response.success = false;
      response.message = "Не заполнены обязательные поля";
      throw new Error();
    }

    // создаём тренировку
    const sql =
      "INSERT INTO training (user_id, date, duration, creation_date, update_date) VALUES (?, ?, ?, NOW(), NOW())";

    const values = [user_id, date, duration];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("training error", err);
        response.status = 500;
        response.success = false;
        response.message = "Server Error";
        return res.status(response.status).json(response);
      }

      const training_id = result.insertId;

      // добавляем упражнения
      exercises.forEach((exersice) => {
        // сначала ищем category_id по имени
        const categorySql = "SELECT category_id FROM category WHERE name = ?";
        db.query(categorySql, [exersice.category], (err, categoryResult) => {
          if (err || categoryResult.length === 0) {
            console.log("category lookup error", err);
            return; // можно обработать ошибку по-другому
          }

          const category_id = categoryResult[0].category_id;

          // теперь вставляем упражнение с category_id
          const exerciseSql =
            "INSERT INTO exersice (training_id, category_id, parameters, duration) VALUES (?, ?, ?, ?)";
          const exerciseValues = [
            training_id,
            category_id,
            exersice.parameters,
            exersice.duration,
          ];

          db.query(exerciseSql, exerciseValues, (err) => {
            if (err) console.log("exercise insert error", err);
          });
        });
      });

      response.body = { training_id };

      return res.status(response.status).json(response);
    });
  } catch (err) {
    console.log(err);
    if (response.message === "Training created") {
      response.message = "Server Error";
      response.status = 500;
    }
    return res.status(response.status).json(response);
  }
};

exports.getTrainings = async (req, res) => {
  const { user_id, date } = req.query;

  let response = {
    message: "Trainings fetched",
    success: true,
    body: null,
    status: 200,
  };

  try {
    if (!user_id || !date) {
      response.status = 400;
      response.success = false;
      response.message = "Не заполнены обязательные поля";
      return res.status(response.status).json(response);
    }

    // const sql = `
    //   SELECT
    //     t.training_id, t.date, t.duration,
    //     e.exersice_id, e.category_id, e.parameters, e.duration AS exercise_duration
    //   FROM training t
    //   LEFT JOIN exersice e ON t.training_id = e.training_id
    //   WHERE t.user_id = ? AND DATE(t.date) = ?
    //   ORDER BY t.date, e.exersice_id
    // `;

    const sql = `
  SELECT 
    t.training_id, t.date, t.duration,
    e.exersice_id, e.parameters, e.duration AS exercise_duration,
    c.name AS category_name
  FROM training t
  LEFT JOIN exersice e ON t.training_id = e.training_id
  LEFT JOIN category c ON e.category_id = c.category_id
  WHERE t.user_id = ? AND DATE(t.date) = ?
  ORDER BY t.date, e.exersice_id
`;

    db.query(sql, [user_id, date], (err, results) => {
      if (err) {
        console.log("DB error:", err);
        response.status = 500;
        response.success = false;
        response.message = "Server Error";
        return res.status(response.status).json(response);
      }

      const trainingsMap = {};

      results.forEach((row) => {
        if (!trainingsMap[row.training_id]) {
          trainingsMap[row.training_id] = {
            training_id: row.training_id,
            date: row.date,
            duration: row.duration,
            exercises: [],
          };
        }

        if (row.exersice_id) {
          trainingsMap[row.training_id].exercises.push({
            exercise_id: row.exersice_id,
            category: row.category_name,
            parameters: row.parameters,
            duration: row.exercise_duration,
          });
        }
      });

      response.body = Object.values(trainingsMap);

      return res.status(response.status).json(response);
    });
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.success = false;
    response.message = "Server Error";
    return res.status(response.status).json(response);
  }
};

exports.getAllTrainings = async (req, res) => {
  const { user_id } = req.query;

  let response = {
    message: "Trainings fetched",
    success: true,
    body: null,
    status: 200,
  };

  try {
    if (!user_id) {
      response.status = 400;
      response.success = false;
      response.message = "Не указан user_id";
      return res.status(response.status).json(response);
    }

    const sql = `
      SELECT 
        t.training_id, t.date, t.duration,
        e.exersice_id, e.parameters, e.duration AS exercise_duration,
        c.name AS category_name
      FROM training t
      LEFT JOIN exersice e ON t.training_id = e.training_id
      LEFT JOIN category c ON e.category_id = c.category_id
      WHERE t.user_id = ?
      ORDER BY t.date, e.exersice_id
    `;

    db.query(sql, [user_id], (err, results) => {
      if (err) {
        console.log("DB error:", err);
        response.status = 500;
        response.success = false;
        response.message = "Server Error";
        return res.status(response.status).json(response);
      }

      const trainingsMap = {};

      results.forEach((row) => {
        if (!trainingsMap[row.training_id]) {
          trainingsMap[row.training_id] = {
            training_id: row.training_id,
            date: row.date,
            duration: row.duration,
            exercises: [],
          };
        }

        // Добавляем упражнения только если они есть
        if (row.exersice_id) {
          trainingsMap[row.training_id].exercises.push({
            exercise_id: row.exersice_id,
            category: row.category_name, 
            parameters: row.parameters,
            duration: row.exercise_duration,
          });
        }
      });

      response.body = Object.values(trainingsMap);
      return res.status(response.status).json(response);
    });
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.success = false;
    response.message = "Server Error";
    return res.status(response.status).json(response);
  }
};

exports.deleteTraining = async (req, res) => {
  const { training_id, user_id } = req.body;

  let response = {
    message: "Training deleted",
    success: true,
    body: null,
    status: 200,
  };

  try {
    if (!training_id || !user_id) {
      response.status = 400;
      response.success = false;
      response.message = "Не указаны training_id или user_id";
      return res.status(response.status).json(response);
    }

    const deleteExercisesSql = `
      DELETE e
      FROM exersice e
      INNER JOIN training t ON e.training_id = t.training_id
      WHERE e.training_id = ? AND t.user_id = ?
    `;
    db.query(deleteExercisesSql, [training_id, user_id], (err) => {
      if (err) {
        console.log("Error deleting exercises:", err);
        response.status = 500;
        response.success = false;
        response.message = "Server Error (exercises)";
        return res.status(response.status).json(response);
      }

      const deleteTrainingSql =
        "DELETE FROM training WHERE training_id = ? AND user_id = ?";
      db.query(deleteTrainingSql, [training_id, user_id], (err, result) => {
        if (err) {
          console.log("Error deleting training:", err);
          response.status = 500;
          response.success = false;
          response.message = "Server Error (training)";
          return res.status(response.status).json(response);
        }

        if (result.affectedRows === 0) {
          response.status = 404;
          response.success = false;
          response.message =
            "Training not found or does not belong to this user";
          return res.status(response.status).json(response);
        }

        return res.status(response.status).json(response);
      });
    });
  } catch (err) {
    console.log(err);
    response.status = 500;
    response.success = false;
    response.message = "Server Error";
    return res.status(response.status).json(response);
  }
};
