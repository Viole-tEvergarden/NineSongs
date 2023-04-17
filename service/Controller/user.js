
const userService = require("../services/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// 注册用户
exports.register = async (req, res, next) => {
  try {
    userService.searchUser(req.body.username, async (error,rows)=>{
      if (error) {
        console.error(error);
        res.status(500).send('服务器错误', error);
      }
      if (rows.length > 0) {
        return res.status(400).send({
          msg:'用户已注册'
        });
      }
      try {
        // 密码加密
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await userService.registerUser(req.body.username, hashedPassword)

        res.status(200).send({
          msg: '注册成功'
        });
      } catch (error) {
        console.error(error);
        res.status(500).send();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};
// 用户登录
exports.login = async (req, res, next) => {
  try {
    const data = await userService.searchUser(req.body.username);
    data.on('result', async (user) => {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send('Incorrect password');
      }

      const sessionId = uuidv4();
      await connection.execute(`INSERT INTO sessions (user_id, session_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE session_id=?`, [user.id, sessionId, sessionId]);

      const token = jwt.sign({ userId: user.id, sessionId }, 'SECRET_KEY');
      res.header('auth-token', token).send(token);
    })

  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}