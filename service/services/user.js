const connection = require('./index');
// 查询用户
exports.searchUser = (username, callback) => connection.query(`SELECT * FROM users WHERE username=?`, [username],callback);
// 注册用户
exports.registerUser = (username, hashedPassword) => connection.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword]);