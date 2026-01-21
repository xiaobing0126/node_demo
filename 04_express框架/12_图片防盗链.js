// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 声明中间件
app.use((req, res, next) => {
  // 检测请求头的referer是否为127.0.0.1
  let referer = req.get("referer");
  if (referer) {
    console.log(referer);
    if (referer !== "http://127.0.0.1:3000/") {
      res.status(404).send("<h1>not found</h1>");
      return;
    }
  }
  next();
});

// /public静态资源放置在这个文件夹下
app.use(express.static(`${__dirname}/public`));

app.listen(3000, () => {
  console.log("服务已经启动");
});
