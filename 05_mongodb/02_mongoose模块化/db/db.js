// 以下代码完成数据库连接的封装
// 连接成功时调用 success 回调，连接失败时调用 error 回调
// 注意：mongoose 连接数据库是一个异步操作
// 1.安装mongoose
// 2.引入mongoose
const mongoose = require("mongoose");

// 引入config数据库配置
const config = require("../config/config");
console.log("output->config", config);

module.exports = function (success, error, close) {
  // 3.连接数据库
  // bilibili数据库名称，没有则会创建
  mongoose.connect(
    `mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`
  );

  // 4.获取连接对象
  const db = mongoose.connection;

  // 5.绑定连接完成的监听
  db.once("open", () => {
    success && success();
  });

  // 6.绑定连接错误的监听
  db.on("error", (err) => {
    console.error("数据库连接失败", err);
    error && error(err);
  });

  // 7.链接关闭的回调
  db.on("close", () => {
    console.log("数据库连接关闭");
    close && close();
  });

  // 关闭数据库连接
  // setTimeout(() => {
  //   db.close();
  // }, 3000);
};
