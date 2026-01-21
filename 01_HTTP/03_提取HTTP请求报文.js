// 导入HTTP模块
const http = require("http");

// 创建服务对象
const server = http.createServer((request, response) => {
  // 防止中文乱码
  response.setHeader("content-type", "text/html;charset=utf-8");
  //获取请求的方法
  // console.log(request.method);
  //获取请求的 url
  // console.log(request.url); // 只包含 url 中的路径与查询字符串
  //获取 HTTP 协议的版本号
  // console.log(request.httpVersion);
  //获取 HTTP 的请求头
  console.log(request.headers);

  // end方法设置响应体
  response.end("你好，http server");
});

server.listen("9000", () => {
  console.log("服务已经启动。。。");
});
