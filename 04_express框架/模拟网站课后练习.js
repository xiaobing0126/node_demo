// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 读取html文件
const fs = require("fs");
console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/尚品汇/index.html`);
// console.log(file.toString());

// 中间件读取css， image文件
app.use(express.static(`${__dirname}/尚品汇`));

// 创建路由
app.get("/home", (req, res) => {
  //   res.sendFile(`${__dirname}/尚品汇/index.html`);
  res.send(file.toString());
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
