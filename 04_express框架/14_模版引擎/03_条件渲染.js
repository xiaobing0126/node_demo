const isLogin = false;

// 读取html文件
const fs = require("fs");
const file = fs.readFileSync("./03_条件渲染.html").toString();
console.log(file);

// ejs条件渲染
const ejs = require("ejs");
// 条件渲染成html
const result = ejs.render(file, { isLogin });
console.log(result);

// 启动服务
const express = require("express");
// 实例化express
const app = express();
app.get("/", (req, res) => {
  res.send(result);
});
app.listen(3000, () => {
  console.log("条件渲染服务已经启动");
});
