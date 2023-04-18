
// 查询用户
exports.searchUser = (connection,username, callback) => connection.query(`SELECT * FROM users WHERE username=?`, [username],callback);
// 注册用户
exports.registerUser = (connection,username, hashedPassword) => connection.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword]);

// 用户登录 添加到 seesion表
exports.userToSessin = (connection,id, sessionId, tokenValue) => connection.query(`INSERT INTO sessions (user_id, session_id, token) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE session_id=?, token=?`, [id, sessionId, tokenValue, sessionId, tokenValue]);
// 查询seesion表
exports.searchUserInsession = (connection,user_id, callback) => connection.query(`SELECT * FROM sessions WHERE user_id=?`, [user_id], callback);
// 删除seesion表
exports.deleteUserInsession = (connection,token) => connection.query(`DELETE FROM sessions WHERE token=?`, [token]);