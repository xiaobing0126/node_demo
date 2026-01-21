var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// 导入express-session中间件，在express框架中操作session。默认存在内存中
const session = require("express-session");
// 将express-session存储到mongodb数据库中
const MongoStore = require("connect-mongo");
const config = require("./config/config");

var accountWebRouter = require("./routes/web/accounts");
var accountApiRouter = require("./routes/api/accounts");

// 需要注册/登录的路由
var regWebRouter = require("./routes/web/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 配置 session 中间件
app.use(
  session({
    name: "sid", // 设置cookie中session id的名称，默认是connect.sid
    secret: "mysecretkey", // 参与加密的字符串
    resave: true, // 是否每次请求都重新保存session，防止session过期
    saveUninitialized: false, // 是否保为每次请求都设置一个cookie用来存储session的id
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
      // maxAge: 5 * 60 * 1000, // 5分钟
      httpOnly: true, // 只能通过http访问，js无法访问
    },
    // 将session存在db数据库中
    store: new MongoStore({
      // mongoUrl: "mongodb://127.0.0.1:27017/bilibili", // 数据库连接字符串
      mongoUrl: `mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`, // 数据库连接字符串
    }),
  })
);

// 会影响ejs文件中引入css，js的路径，需要修改ejs中的引入地址，需要把静态资源放在public文件夹下
// 这个带页面的路由
app.use("/accounts", accountWebRouter);

app.use("/auth", regWebRouter);

// API 路由，纯JSON数据返回
app.use("/api", accountApiRouter);

// 根路由重定向
app.get("/", function (req, res) {
  res.redirect("/accounts/list");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
