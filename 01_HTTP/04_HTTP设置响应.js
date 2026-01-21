// 导入HTTP模块
const http = require("http");

// 创建服务对象
const server = http.createServer((request, response) => {
  // 防止中文乱码
  response.setHeader("content-type", "text/html;charset=utf-8");
  // 设置响应状态码
  response.statusCode = 202;
  response.statusMessage = "this is message";
  // 设置响应体：write跟end方法的响应数据会拼接在一起。一般写了write，就不会再写end方法
  response.write("this is response");
  // end方法设置响应体
  response.end("你好啊啊啊啊， http server");
});

server.listen("9000", () => {
  console.log("服务已经启动。。。");
});
