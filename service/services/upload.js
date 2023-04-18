
exports.insertFile = async (connection,file) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO files SET ?', { filename: file.filename }, (error, results) => {
      connection.release()
      if (error) {
        reject(error);
        return;
      }
      // console.log("结果:", results);
      resolve(results);
    });
  })
};
