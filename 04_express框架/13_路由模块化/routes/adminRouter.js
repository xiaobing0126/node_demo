const express = require("express");

// 引入路由
const adminRouter = express.Router();

// 后台
adminRouter.get("/admin", (req, res) => {
  res.send("后台首页");
});

module.exports = adminRouter;
