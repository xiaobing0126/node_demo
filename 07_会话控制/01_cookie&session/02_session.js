// 导入express
const express = require("express");

// 导入express-session中间件，在express框架中操作session。默认存在内存中
const session = require("express-session");
// 将express-session存储到mongodb数据库中
const MongoStore = require("connect-mongo");

// 创建应用对象
const app = express();
app.use(
  session({
    name: "sid", // 设置cookie中session id的名称，默认是connect.sid
    secret: "mysecretkey", // 参与加密的字符串
    resave: true, // 是否每次请求都重新保存session，防止session过期
    saveUninitialized: false, // 是否保为每次请求都设置一个cookie用来存储session的id
    cookie: {
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
      maxAge: 5 * 60 * 1000, // 5分钟
      httpOnly: true, // 只能通过http访问，js无法访问
    },
    store: new MongoStore({
      mongoUrl: "mongodb://127.0.0.1:27017/bilibili", // 数据库连接字符串
    }),
  })
);

// 登陆
app.get("/login", (req, res) => {
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  // 模拟登录成功，设置 session
  if (req.query.username === "admin" && req.query.password === "123456") {
    req.session.user = {
      username: "xiaobingzi",
      role: "admin",
    };
    res.end("登录成功");
  } else {
    res.end("登录失败");
  }
});

// 读取->模仿访问购物车
app.get("/cart", (req, res) => {
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  if (req.session.user && req.session.user.role === "admin") {
    res.end("欢迎来到购物车页面，尊敬的管理员 " + req.session.user.username);
  } else {
    res.end("请先登录");
  }
});

// 退出登录
app.get("/logout", (req, res) => {
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  // 销毁 session
  req.session.destroy();
  res.end("您已退出登录");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
