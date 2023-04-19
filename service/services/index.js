const mysql = require("mysql");
const util = require('util');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1457asd!",
  database: "ninesongs",//库名
  port: '3306', //默认 3306
});


pool.query = util.promisify(pool.query);
module.exports = pool;