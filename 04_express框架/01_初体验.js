// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 创建路由
app.get("/home", (req, res) => {
  res.end("hello expyress");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
