// 文件插入 files 表
exports.insertFile = async (connection,file) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO files SET ?', { filename: file.filename, path: file.path }, (error, results) => {
      connection.release()
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  })
};
