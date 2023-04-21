

const { implementSql } = require('./implementSql.js');
class UserService {
  //查询用户
  async searchUser(username) {
    return await implementSql(`SELECT * FROM users WHERE username=?`, [username]);
  };
  // 注册用户
  async registerUser(username, hashedPassword) {
    return await implementSql(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword]);
  };
  //查询用户是否在 session 表中
  searchUserInsession(user_id) {
    return implementSql(`SELECT * FROM sessions WHERE user_id=?`, [user_id]);
  }
  // 添加到 session 表
  userToSessin(user_id, sessionId, tokenValue) {
    return implementSql(`INSERT INTO sessions (user_id, session_id, token) VALUES (?, ?, ?)`, [user_id, sessionId, tokenValue]);
  }
  // 从seeion表中删除
  deleteUserInsession(token) {
    return implementSql(`DELETE FROM sessions WHERE token=?`, [token]);
  }
}
module.exports = new UserService();