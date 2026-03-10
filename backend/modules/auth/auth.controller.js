const db = require("../../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const JWT_SECRET = "your_jwt_secret";

exports.signUp = async (req, res) => {
  const {  email, password } = req.body;
  const id = uuidv4();

  let response = {
    message: "Success sign-up",
    success: true,
    body: null,
    status: 200,
  };

  try {
    //validation
    if ( !email || !password) {
      response.status = 400;
      response.success = false;
      response.message = "Не заполненны все поля";
      throw new Error();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      response.status = 400;
      response.success = false;
      response.message = "Неверный формат email";
      throw new Error();
    }

    if (password.length < 6) {
      response.status = 400;
      response.success = false;
      response.message = "Пароль должен быть не менее 6 символов";
      throw new Error();
    }
    const password_hash = await bcrypt.hash(String(password), 10);
    const sql =
      "INSERT INTO user (user_id, email, password_hash) VALUES (?, ?, ?)";
    const values = [id, email, password_hash];
    
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("error", err);
        response.status = 500;
        response.success = false;
        response.message = "Server Error";
        return;
      }
    });

    return res.status(response.status).json(response);
  } catch (err) {
    console.log(err)
    if (response.message != "Success sign-up") {
      response.message = "Server Error";
      response.status = 500;
    }
    return res.status(response.status).json(response);
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  let response = {
    message: "Success sign-in",
    success: true,
    body: null,
    status: 200,
  };

  try {
    if (!email || !password) {
      response.status = 400;
      response.success = false;
      response.message = "Заполните все поля";
      throw new Error();
    }

    const sql = "SELECT * FROM User WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
      try {
        if (err) {
          response.status = 500;
          response.message = "Server Error";
        }
        if (results.length === 0) {
          response.status = 400;
          response.message = "Неверный логин или пароль";
          throw new Error();
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
          response.status = 400;
          response.message = "Неверный логин или пароль";
          throw new Error();
        }
        const token = jwt.sign({ id: user.user_id }, JWT_SECRET, {
          expiresIn: "1h",
        });

        response.body = {
          token: token,
          id: user.user_id
        };
      } catch (error) {
        response.success = false;
      } finally {
        res.status(response.status).json(response);
      }
    });
  } catch (err) {
    if (response.message != "Success support request") {
      response.message = "Server Error";
      response.status = 500;
    }
    return res.status(response.status).json(response);
  }
};

exports.deleteUser = (req, res) => {
  const { userId } = req.query;

  let response = {
    message: "User successfully deleted",
    success: true,
    body: null,
    status: 200,
  };

  try {
    console.log("userId:", userId);

    if (!userId) {
      response.status = 400;
      response.success = false;
      response.message = "userId is required";
      throw new Error("userId missing");
    }

    const sql = "DELETE FROM user WHERE user_id = ?";

    db.query(sql, [userId], (err, result) => {
      try {
        if (err) {
          // console.log("DB ERROR:", err);

          response.status = 500;
          response.success = false;
          response.message = "Server Error";
          throw err;
        }

        // console.log("DB RESULT:", result);

        if (!result || result.affectedRows === 0) {
          response.status = 400;
          response.success = false;
          response.message = "User not found";
          throw new Error("user not found");
        }

      } catch (error) {

        // console.log("DELETE ERROR:", error);

        if (response.status === 200) {
          response.status = 500;
          response.success = false;
          response.message = "Server Error";
        }

      } finally {
        res.status(response.status).json(response);
      }
    });

  } catch (err) {

    // console.log("OUTER ERROR:", err);

    response.status = 500;
    response.success = false;
    response.message = "Server Error";

    return res.status(response.status).json(response);
  }
};

exports.updatePassword = async (req, res) => {
  const { user_id, new_password } = req.body;

  let response = {
    message: "Password updated successfully",
    success: true,
    body: null,
    status: 200,
  };

  try {
    if (new_password.length < 6) {
      response.status = 400;
      response.success = false;
      response.message = "Пароль должен быть не менее 6 символов";
      throw new Error();
    }
    const password_hash = await bcrypt.hash(String(new_password), 10);
    const sql = "UPDATE user SET password_hash = ? WHERE user_id = ?";
    const values = [password_hash, user_id];
    
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("error", err);
        response.status = 500;
        response.success = false;
        response.message = "Server Error";
        return;
      }
    });

    return res.status(response.status).json(response);
  } catch (err) {
    console.log(err)
    if (response.message != "Password updated successfully") {
      response.message = "Server Error";
      response.status = 500;
    }
    return res.status(response.status).json(response);
  }
};
