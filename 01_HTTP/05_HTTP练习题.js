// 导入HTTP模块
const http = require("http");
// 读取文件
const fs = require("fs");

// 创建服务对象
const server = http.createServer((request, response) => {
  // 防止中文乱码
  response.setHeader("content-type", "text/html;charset=utf-8");
  // console.log(request.url);
  let pathname = request.url;
  console.log(__dirname);
  console.log("pathname--", pathname);

  // 不同的请求地址，返回不同的响应
  if (pathname === "/") {
    let file = fs.readFileSync(__dirname + "/05_table.html");
    response.end(file);
  }
  // response.end("aaa");
});

server.listen(9000, () => {
  console.log("服务已经启动。。。");
});
