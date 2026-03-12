const db = require("../../database/db");

exports.createProfile = (req, res) => {
  const { user_id, name, weight, height, sex, age, goal} = req.body;

  let response = {
    message: "Profile successfully created",
    success: true,
    body: null,
    status: 200,
  };

  try {

    if (!user_id) {
      response.success = false;
      response.message = "user_id is required";
      response.status = 400;
      return res.status(400).json(response);
    }

    const sql = `
      INSERT INTO Profile (user_id, name, weight, height, sex, age, goal)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [user_id, name, weight, height, sex, age, goal], (err, result) => {

      try {

        if (err) {
          throw new Error();
        }

        response.body = {
          user_id,
          name,
          weight,
          height,
          sex,
          age, 
          goal
        };

      } catch (err) {
        console.log(err);
        response.success = false;
        response.message = "Server error";
        response.status = 500;

      } finally {

        return res.status(response.status).json(response);

      }

    });

  } catch (err) {

    response.success = false;
    response.message = "Server error";
    response.status = 500;

    return res.status(response.status).json(response);
  }
};

exports.getProfile = (req, res) => {
  const { user_id } = req.query;

  let response = {
    message: "Profile successfully received",
    success: true,
    body: null,
    status: 200,
  };

  try {

    if (!user_id) {
      response.success = false;
      response.message = "userId is required";
      response.status = 400;
      return res.status(400).json(response);
    }

    const sql = `SELECT * FROM Profile WHERE user_id = ?`;

    db.query(sql, [user_id], (err, result) => {

      try {

        if (err) {
          throw new Error();
        }

        if (!result || result.length === 0) {
          response.success = false;
          response.message = "Profile not found";
          response.status = 400;
        } else {
          response.body = result[0];
        }

      } catch (err) {

        response.success = false;
        response.message = "Server error";
        response.status = 500;

      } finally {

        return res.status(response.status).json(response);

      }

    });

  } catch (err) {

    response.success = false;
    response.message = "Server error";
    response.status = 500;

    return res.status(response.status).json(response);
  }
};

exports.updateProfile = async (req, res) => {
  const { user_id, name, weight, height, sex, age , goal} = req.body;
  
  let response = {
    message: "Profile updated",
    success: true,
    body: null,
    status: 200,
  };

  try {
    if (!user_id) {
      response.status = 400;
      response.success = false;
      response.message = "user_id is required";
      throw new Error();
    }

    if (!name && !weight && !height && !sex && !age && !goal) {
      response.status = 400;
      response.success = false;
      response.message = "Нет полей для обновления";
      throw new Error();
    }
    
    const set = [];
    const values = [];

    if (name !== undefined) {
      set.push("name = ?");
      values.push(name);
    }

    if (weight !== undefined) {
      set.push("weight = ?");
      values.push(weight);
    }

    if (height !== undefined) {
      set.push("height = ?");
      values.push(height);
    }

    if (sex !== undefined) {
      set.push("sex = ?");
      values.push(sex);
    }

    if (age !== undefined) {
      set.push("age = ?");
      values.push(age);
    }

    if (goal !== undefined) {
      set.push("goal = ?");
      values.push(goal);
    }

    const sql = `UPDATE profile SET ${set.join(", ")} WHERE user_id = ?`;
    values.push(user_id);

    await db.promise().query(sql, values);

    const [rows] = await db
      .promise()
      .query("SELECT * FROM profile WHERE user_id = ?", [user_id]);

    response.body = rows[0];

    return res.status(response.status).json(response);
  } catch (err) {
    // console.log(err)
    if (response.message === "Profile updated") {
      response.message = "Server Error";
      response.status = 500;
      response.success = false;
    }
    return res.status(response.status).json(response);
  }
};

