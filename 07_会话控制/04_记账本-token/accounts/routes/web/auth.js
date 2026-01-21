var express = require("express");
var router = express.Router();

// 导入模型
const UserModel = require("../../model/UserModel");

// 注册页面
router.get("/reg", function (req, res, next) {
  res.render("auth/reg");
});

// 登陆页面
router.get("/login", function (req, res, next) {
  res.render("auth/login", { msg: "" });
});

// 注册表单提交
router.post("/reg", async function (req, res, next) {
  let { username, password } = req.body;
  console.log("注册数据---", username, password);

  // 保存到数据库
  let user = new UserModel({
    name: username,
    password: password,
    time: new Date(),
  });

  await user
    .save()
    .then((data) => {
      console.log("注册成功", data);
      res.redirect("/auth/login");
      //   res.render("auth/login", { msg: "注册成功，请登录" });
    })
    .catch((err) => {
      console.error("注册失败", err);
      res.redirect("/auth/reg");
    });
});

// 登陆成功 -> 前往账单列表页面
router.post("/login", function (req, res, next) {
  let { username, password } = req.body;
  console.log("登陆数据---", username, password);

  // 查询数据库
  UserModel.findOne({ name: username, password: password })
    .then((data) => {
      if (data) {
        console.log("登陆成功", data);
        // 设置 session
        req.session.user = {
          username: data.name,
          role: "admin",
        };
        res.redirect("/accounts/list");
      } else {
        console.log("用户名或密码错误");
        res.render("auth/login", { msg: "用户名或密码错误" });
      }
    })
    .catch((err) => {
      console.error("登陆失败", err);
      res.render("auth/login", { msg: "登陆失败，请重试" });
    });
});

// 退出登录
router.post("/logout", function (req, res, next) {
  // 销毁 session
  req.session.destroy(function (err) {
    if (err) {
      console.error("退出登录失败", err);
    } else {
      console.log("退出登录成功");
      res.redirect("/auth/login");
    }
  });
});

module.exports = router;
