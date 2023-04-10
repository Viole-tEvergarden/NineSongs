const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1457asd!",
  database: "ninesongs",//库名
  port: '3306', //默认 3306
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
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM user", (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      console.log("Query results:", results);
      resolve(results);
    });
  })
    .then((music) => {
      console.log("Database connection closed");
      return music;
    })
    .catch((err) => {
      console.error("Error closing database connection: ", err);
    })
    .finally(() => {
      connection.end();
    });
};

