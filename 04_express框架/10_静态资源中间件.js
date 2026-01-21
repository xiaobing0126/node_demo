// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// /public静态资源放置在这个文件夹下,读取静态资源
app.use(express.static(`${__dirname}/public`));

// 创建路由
app.get("/home", (req, res) => {
  res.end("hello express");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
