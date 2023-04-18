const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1457asd!",
  database: "ninesongs",//库名
  port: '3306', //默认 3306
});

/**
 * @description 处理请求的方法，通过数据库连接池获取数据库连接，执行 SQL 查询
 * @param {Object} req - http请求对象
 * @param {Object} res - http响应对象
 * @param {Function} callback - 回调函数，用于处理 SQL 查询
 */
exports.handleRequest = (req, res, callback) => {
  pool.getConnection((err,conn) => {
    if (err) {
      console.error('获取数据库连接失败：', err);
      res.status(500).send('获取数据库连接失败');
    } else {
      console.log('成功获取到数据库连接对象：', conn);
      // 执行 SQL 查询
      callback(req, res,conn);
    }
  });
}