// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 三部分组成，请求方法，请求路径，回调函数
// 创建路由
app.get("/request", (req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.httpVersion);
  console.log(req.headers);

  // 获取express参数
  console.log(req.path);
  console.log(req.query);

  // 获取ip--启动服务，在同一局域网下，手机也可以访问本机的地址
  // 本机地址获取：（ipconfig getifaddr en0获取，en0是无线网，en1是有线）
  console.log(req.ip);

  // 获取请求头
  console.log(req.get("host"));

  res.end("hello express");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
