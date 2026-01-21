/**
 * 按照要求搭建 HTTP 服务
 *
 * GET   /login  显示表单网页
 * POST  /login  获取表单中的『用户名』和『密码』
 */

// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 获取body-parser
const bodyParser = require("body-parser");

// 解析JSON格式的请求体中间件
const jsonParser = bodyParser.json();

// 解析query string格式的请求体中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// get
app.get("/login", (req, res) => {
  // res.send("表单页面");
  res.sendFile(`${__dirname}/11_form.html`);
});

// post
// 当请求体中间执行完成后，会往req中添加一个请求对象，名字叫body
app.post("/login", urlencodedParser, (req, res) => {
  // 获取请求体数据
  console.log(req.body);
  res.send("获取用户数据");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
