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

