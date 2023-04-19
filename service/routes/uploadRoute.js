const express = require('express');
const UploadController = require("../Controller/upload");

const router = express.Router();
// 用于处理 HTTP POST 请求中的 multipart / form - data 数据，也就是用于处理表单（form）数据，并可以上传文件
const multer = require('multer');

// 设置上传文件目录和文件名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + encodeURIComponent(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), UploadController.upload);

module.exports = router;