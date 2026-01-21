// 导入express
const express = require("express");

// 获取Cookie解析中间件
const cookieParser = require("cookie-parser");

// 创建应用对象
const app = express();
app.use(cookieParser());

// 创建路由
app.get("/set-cookie", (req, res) => {
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  // 响应设置cookie
  res.cookie("username", "xiaobingzi", {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
    httpOnly: true, // 只能通过http访问，js无法访问
  });
  res.end("cookie 已设置");
});

// 获取 cookie
app.get("/get-cookie", (req, res) => {
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  // 获取cookie
  let cookies = req.cookies;
  console.log("cookies---", cookies); // { username: 'xiaobingzi' }

  res.end("hello express");
});

// 删除 cookie
app.get("/clear-cookie", (req, res) => {
  res.setHeader("Content-Type", "text/plain;charset=utf-8");

  res.clearCookie("username");
  res.end("cookie 已删除");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
