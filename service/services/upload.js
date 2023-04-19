// 文件插入 files 表
const db = require('../services/index');
const util = require('util');
class FileService {
  async insertFile({filename, path}) {
    let connection;
    try {
      connection = await db.getConnection();
      connection.query = util.promisify(connection.query);
      const sql = 'INSERT INTO files SET ?'
      const result = await connection.query(sql, { filename: filename, path: path });
      return result;
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}
module.exports = new FileService();