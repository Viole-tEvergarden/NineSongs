
const userService = require("../services/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

const UserService = require("../services/user");
class UserController {
  async register(req, res) {
    try {
      const result = await UserService.searchUser(req.body.username);
      if (result.length > 0) {
        return res.status(400).send({
          msg: '用户已注册'
        });
      }
      try {
        // 密码加密
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await UserService.registerUser(req.body.username, hashedPassword);
        res.status(200).send({
          code: '00000',
          msg: '注册成功'
        });
      } catch (error) {
        throw error
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({
        code: '500',
        msg: "插入数据库错误",
        data
      });
    }
  }
  async login(req, res) {
    try {
      // 查询用户是否存在
      const result = await UserService.searchUser(req.body.username);
      if (result.length === 0) {
        return res.status(401).send({
          code: '00001',
          msg: '用户不存在'
        });
      }
      const isPasswordValid = await bcrypt.compare(req.body.password, result[0].password);
      // 比较密码
      if (!isPasswordValid) {
        return res.status(401).send({
          code: '00001',
          msg: '密码错误'
        });
      }
      // 查询用户是否在 seesion表中 判断是否已登录
      const seeionResult = await UserService.searchUserInsession([result[0].id]);
      if (seeionResult.length>0) {
        return res.status(401).send({
          code: '00001',
          msg: '用户已登录'
        });
      } else {
        const sessionId = v4();
        // 生成token
        const token = jwt.sign({ userId: result[0].id, sessionId }, 'SECRET_KEY');
        // 添加到 seesion表
        await UserService.userToSessin(result[0].id, sessionId, token);

        res.header('auth-token', token).send({
          code: '00000',
          msg: '登录成功',
          token,
          data: {
            ...result[0]
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        code: '50001',
        msg: '服务器错误',
        error
      });
    }
  }
  async logout(req,res){
    try {
      await userService.deleteUserInsession(req.headers.token);
      res.status(200).send({
        code: '00000',
        msg: '登出成功'
      });
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }
}
module.exports = new UserController();