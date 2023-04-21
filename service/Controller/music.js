const musicService = require("../services/musicService");

class MusicController {
  async addMusic(req, res) {
    try {
      const data = await musicService.addMusic(req.body);
      res.json({
        code: 200,
        msg: "提交成功"
      });
    } catch (error) {
      console.error(error)
      res.status(500).json({
        code: 500,
        msg: "提交失败",
        list: error
      });
    }
  };
  // 查询歌曲列表
  findAllMusic = async (req, res)=>{
    try {
      const list = await musicService.findWhichPageMusic(req.query);
      const total = await musicService.getSum();
      res.status(200).send({
        code: 200,
        msg: "查询成功",
        list,
        pageNum: req.query.pageNum,
        total: total,
        pageSize: req.query.pageSize
      });
    } catch (error) {
      console.error(error)
      res.status(500).json({
        code: 500,
        msg: "提交失败",
        list: error
      });
    }
  }
}
module.exports = new MusicController();