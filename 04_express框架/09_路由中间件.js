// 导入express
const express = require("express");
const fs = require("fs");
const path = require("path");

// 创建应用对象
const app = express();

// 定义一个全局中间件->本质是一个回调函数
// 参数为521才返回
function midware(req, res, next) {
  if (req.query.code === "521") {
    next();
  } else {
    res.send("not found");
  }
}

// 创建路由
app.get("/home", midware, (req, res) => {
  res.send("前台首页");
});

app.get("/admin", (req, res) => {
  res.send("后台首页");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
