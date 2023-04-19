const FileService = require("../services/upload");
class UploadController {
  async upload(req, res) {
    // 获取文件信息
    const file = req.file;
    try {
      const result = await FileService.insertFile(file);
      res.send({
        code: '00000',
        msg: "上传成功",
        data: {
          insertId: result.insertId
        }
      });
    } catch (error) {
      console.error(error)
      res.status(500).json({
        code: '500',
        msg: "插入数据库错误",
        data
      });
    }
  }
}
module.exports = new UploadController();