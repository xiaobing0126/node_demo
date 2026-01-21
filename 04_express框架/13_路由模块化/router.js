// 导入express
const express = require("express");
const fs = require("fs");
const path = require("path");
const homeRouter = require("./routes/homeRouter");
const adminRouter = require("./routes/adminRouter");

// 创建应用对象
const app = express();

app.use(homeRouter);
app.use(adminRouter);

app.listen(3000, () => {
  console.log("服务已经启动");
});
