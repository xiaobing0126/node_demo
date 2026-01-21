// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 创建路由
app.get("/other", (req, res) => {
  // 重定向响应
  //   res.redirect("https://www.baidu.com");
  // 下载响应
  //   res.download(`${__dirname}/singer.json`);
  // JSON 响应
  // res.json({
  //   name: '尚硅谷',
  //   slogon: '让天下没有难学的技术'
  // })
  //响应文件内容
  res.sendFile(__dirname + "/test.html"); // path.resolve()
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
