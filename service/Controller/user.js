
const userService = require("../services/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
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
      // 比较密码
      if (!isPasswordValid) {
        return res.status(401).send({
          code: '00001',
          msg: '密码错误'
        });
      }
      // 判断是否已经在 seesion表中
      await userService.searchUserInsession(user.id, async (error, rows) => {
        if (rows.length>0) {
          res.status(200).send({
            code: '00000',
            msg: '用户已登录',
          });
        } else {
          const sessionId = v4();
          // 添加到 seesion表
          await userService.userToSessin(user.id, sessionId, sessionId);
          // 生成token
          const token = jwt.sign({ userId: user.id, sessionId }, 'SECRET_KEY');
          res.header('auth-token', token).send({
            code: '00000',
            msg: '登录成功',
            token,
            data: {
              userId: user.id,
              username: user.username
            }
          });
        }
      })
    })

  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}