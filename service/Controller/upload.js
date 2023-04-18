const uploadService = require("../services/upload");
exports.upload = async (req, res, conn) => {
  // 获取文件信息
  const file = req.file;
  // 将文件信息保存到数据库中
  const data = await uploadService.insertFile(conn,file);
  if (data.insertId) {
    res.send({
      code: '00000',
      msg: "上传成功",
      data: {
        insertId: data.insertId
      }
    });
  } else {
    res.send({
      code: '500',
      msg: "插入数据库错误",
      data
    });
  }
}