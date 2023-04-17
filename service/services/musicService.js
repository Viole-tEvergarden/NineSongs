const connection = require('./index');
// 公共函数：获取
exports.getMusicRecommendList = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (error, results, fields) => {
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

