const musicService = require("../services/musicService");

class MusicController {
  async addMusic(req, res) {
    try {
      const data = await musicService.addMusic(req.body);
      res.json({
        code: '00000',
        msg: "提交成功"
      });
    } catch (error) {
      console.error(error)
      res.status(500).json({
        code: '500',
        msg: "提交失败",
        data: error
      });
    }
  }
}
module.exports = new MusicController();