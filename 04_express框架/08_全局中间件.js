// 导入express
const express = require("express");
const fs = require("fs");
const path = require("path");

// 创建应用对象
const app = express();

// 定义一个全局中间件->本质是一个回调函数
function midware(req, res, next) {
  fs.appendFileSync(
    path.resolve(__dirname, "./access.log"),
    `${req.url} ${req.ip} \r\n`
  );
  next();
}

// 使用中间件函数
app.use(midware);

// 创建路由
app.get("/home", (req, res) => {
  res.send("前台首页");
});

app.get("/admin", (req, res) => {
  res.send("后台首页");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
