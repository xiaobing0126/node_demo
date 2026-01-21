// 导入express
const express = require("express");
// 创建应用对象
const app = express();

const path = require("path");

// 1.设置模板引擎
app.set("view engine", "ejs"); // 模板引擎框架还有pug,twing等
// 2.设置模板文件存放位置。 模板文件：具有模板语内容的文件
app.set("views", path.resolve(__dirname, "./views"));

// 创建路由
app.get("/home", (req, res) => {
  // 3.render响应,文件名是在第二步设置的路径下查找
  //   res.render("模板文件名", "数据");
  // 4.创建模板文件
  // 注意！！！views文件夹里头一定要是ejs的文件后缀名
  let title = "你好，小宗";
  res.render("hello", { title });
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
