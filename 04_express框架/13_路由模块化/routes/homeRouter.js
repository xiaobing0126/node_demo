const express = require("express");

// 引入路由
const homeRouter = express.Router();

// 首页
homeRouter.get("/home", (req, res) => {
  res.send("前台首页");
});

// 搜索
homeRouter.get("/search", (req, res) => {
  res.send("搜索首页");
});

module.exports = homeRouter;
