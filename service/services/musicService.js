const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database");
});

// 公共函数：获取
exports.getMusicRecommendList = async (id) => {
  connection.query("SELECT * FROM users", (error, results, fields) => {
    if (error) throw error;
    console.log("Query results:", results);
  });

  connection.end((err) => {
    if (err) {
      console.error("Error closing database connection: ", err);
      return;
    }
    console.log("Database connection closed");
  });
  return music;
};

