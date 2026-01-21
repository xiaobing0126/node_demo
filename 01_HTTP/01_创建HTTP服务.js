// 导入HTTP模块
const http = require("http");

// 创建服务对象
const server = http.createServer((request, response) => {
  // 防止中文乱码
  response.setHeader("content-type", "text/html;charset=utf-8");
  // end方法设置响应体
  response.end("你好， http server");
});

server.listen("9000", () => {
  console.log("服务已经启动。。。");
});
