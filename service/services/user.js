

const db = require('../services/index');
const util = require('util');
class UserService {
  //查询用户
  async searchUser(username) {
    return await this.sql(`SELECT * FROM users WHERE username=?`, [username]);
  };
  // 注册用户
  async registerUser(username, hashedPassword) {
    return await this.sql(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword]);
  };
  //查询用户是否在 session 表中
  searchUserInsession(user_id) {
    return this.sql(`SELECT * FROM sessions WHERE user_id=?`, [user_id]);
  }
  // 添加到 session 表
  userToSessin(user_id, sessionId, tokenValue) {
    return this.sql(`INSERT INTO sessions (user_id, session_id, token) VALUES (?, ?, ?)`, [user_id, sessionId, tokenValue]);
  }
  // 从seeion表中删除
  deleteUserInsession(token) {
    return this.sql(`DELETE FROM sessions WHERE token=?`, [token]);
  }
  async sql(sql, params) {
    let connection;
    try {
      connection = await db.getConnection();
      connection.query = util.promisify(connection.query);
      const result = await connection.query(sql, params);
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
module.exports = new UserService();