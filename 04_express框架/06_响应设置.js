// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 创建路由
app.get("/response", (req, res) => {
  //原生响应
  // res.statusCode = 404;
  // res.statusMessage = 'love';
  // res.setHeader('xxx', 'yyy');
  // res.write('hello express ')
  // res.end('response');

  //express 响应
  // res.status(500); // 状态码
  // res.set('aaa','bbb'); // 响应头
  // res.send('你好 Express'); // 响应体
  res.status(500).set("abc", "def").send("这都是 OK 的");
  res.end("hello express");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
