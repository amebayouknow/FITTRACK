const db = require("../../database/db");

exports.addTraining = async (req, res) => {
  const { user_id, date, duration, exercises } = req.body;

  let response = {
    message: "Training created",
    success: true,
    body: null,
    status: 200,
  };

  try {
    // validation
    if (!user_id || !date || !exercises || exercises.length === 0) {
      response.status = 400;
      response.success = false;
      response.message = "Не заполнены обязательные поля";
      throw new Error();
    }

    const sql =
      "INSERT INTO training (user_id, date, duration, creation_date, update_date) VALUES (?, ?, ?, NOW(), NOW())";

    const values = [user_id, date, duration];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("error", err);
        response.status = 500;
        response.success = false;
        response.message = "Server Error";
        return res.status(response.status).json(response);
      }

      const training_id = result.insertId;

      // добавляем упражнения
      exercises.forEach((exercise) => {
        const exerciseSql =
          "INSERT INTO exersice (training_id, category_id, parameters, duration) VALUES ( ?, ?, ?, ? )";

        const exerciseValues = [
          training_id,
          exercise.category_id,
          exercise.parameters,
          exercise.duration,
        ];

        db.query(exerciseSql, exerciseValues, (err) => {
          if (err) {
            console.log("exercise error", err);
          }
        });
      });

      response.body = { training_id };

      return res.status(response.status).json(response);
    });
  } catch (err) {
    console.log(err);

    if (response.message == "Training created") {
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

    const sql = `
      SELECT 
        t.training_id, t.date, t.duration,
        e.exersice_id, e.category_id, e.parameters, e.duration AS exercise_duration
      FROM training t
      LEFT JOIN exersice e ON t.training_id = e.training_id
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
            category_id: row.category_id,
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
