const db = require("../../database/db");

exports.getCategories = async (req, res) => {
  let response = {
    message: "Categories successfully received",
    success: true,
    body: null,
    status: 200,
  };

  const sql = "select name from category";
  db.query(sql, async (err, result) => {
    try {
      if (result.length === 0) {
        response.message = "Ни созданно ни одной категории"
        throw new Error();
      }

      response.body = { list: result };
    } catch (error) {
      response.success = false;
      if(response.message === "Categories successfully received"){
        response.message = "Server error";
      }
      response.status = 500;
    } finally {
      return res.status(response.status).json(response);
    }
  });
};