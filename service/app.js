const express = require("express");
//这个模块是一个 Express 中间件，用于对 HTTP POST 请求中的表单数据进行解析。它支持 JSON、原始文本和 URL 编码格式，并将这些数据解析成 JavaScript 对象。
const bodyParser = require("body-parser");
// 这个模块是一个 Express 中间件，用于处理跨域资源共享问题。它通过设置响应头来授权其他域名访问当前应用程序中的资源。
const cors = require("cors");
// 这个模块是一个 Express 中间件，用于打印 HTTP 请求的日志。它提供了多种日志格式和配置选项，方便调试和故障排除。
const morgan = require("morgan");
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

const musicListController = require("./Controller/musicList");
const userController = require("./Controller/user");
const uploadController = require("./Controller/upload");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

// 连接数据库函数
const { handleRequest } = require('./services/index');
// 接口监听
app.get("/music", musicListController.getMusicRecommendList);
app.post("/register", (req, res) => handleRequest(req, res, userController.register));
app.post("/login", (req, res) => handleRequest(req, res, userController.login));
app.post("/logout", (req, res) => handleRequest(req, res, userController.logout));
app.post('/upload', upload.single('file'), (req, res) => handleRequest(req, res, uploadController.upload));// 处理POST /upload请求，上传附件


app.listen(3000, () => {
  console.log("服务启动, 端口号:3000");
});
