const express = require("express");
//这个模块是一个 Express 中间件，用于对 HTTP POST 请求中的表单数据进行解析。它支持 JSON、原始文本和 URL 编码格式，并将这些数据解析成 JavaScript 对象。
const bodyParser = require("body-parser");
// 这个模块是一个 Express 中间件，用于处理跨域资源共享问题。它通过设置响应头来授权其他域名访问当前应用程序中的资源。
const cors = require("cors");
// 这个模块是一个 Express 中间件，用于打印 HTTP 请求的日志。它提供了多种日志格式和配置选项，方便调试和故障排除。
const morgan = require("morgan");


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));


// 设置静态文件目录
app.use(express.static('uploads'));

// 路由挂载
const musicRoute = require("./routes/musicRoute");
const uploadRoute = require("./routes/uploadRoute");
const userRoute = require("./routes/userRoute");
app.use("/music", musicRoute);
app.use("/upload", uploadRoute);
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("服务启动, 端口号:3000");
});

// 全局常量
global.API_BASE_URL = 'http://localhost:3000';