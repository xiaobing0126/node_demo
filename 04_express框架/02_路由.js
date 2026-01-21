// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 三部分组成，请求方法，请求路径，回调函数
// 创建路由
app.get("/home", (req, res) => {
  res.end("hello express");
});

// 默认路径
app.get("/", (req, res) => {
  res.end("home");
});

// post
app.post("/login", (req, res) => {
  res.end("login success");
});

// all
app.all("/login", (req, res) => {
  res.end("all method success");
});

// express5.x版本对通配符进行了改动
// 匹配所有路径
app.all("/{*all}", (req, res) => {
  res.end("source error");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
