const FileService = require("../services/upload");
class UploadController {
  async upload(req, res) {
    // 获取文件信息
    const file = req.file;
    try {
      const result = await FileService.insertFile(file);
      console.log(result.code);
      res.send({
        code: result.code || 200,
        msg: result.msg || "上传成功",
        data: {
          id: result.insertId
        }
      });
    } catch (error) {
      console.error(error)
      res.status(500).json({
        code: '500',
        msg: error
      });
      
    }
  }
}
module.exports = new UploadController();