const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../../model/UserModel");
const JWT_SECRET = require("../../config/config").JWT_SECRET;

// 登陆成功 -> 前往账单列表页面
router.post("/login", function (req, res, next) {
  let { username, password } = req.body;
  console.log("登陆数据---", username, password);

  // 查询数据库
  UserModel.findOne({ name: username, password: password })
    .then((data) => {
      if (data) {
        console.log("登陆成功", data);
        // 生成 token
        let token = jwt.sign(
          {
            username: data.name,
          },
          JWT_SECRET,
          {
            expiresIn: 60 * 60, //单位是秒
          }
        );
        console.log("生成的 token 是：", token);
        // token由 前端放在请求头 token 里发送给后端
        res.json({ code: "0000", msg: "登陆成功", token: token });
        // res.redirect("/accounts/list");
      } else {
        console.log("用户名或密码错误");
        res.json({ code: "1001", msg: "用户名或密码错误" });
      }
    })
    .catch((err) => {
      console.error("登陆失败", err);
      res.json({ code: "1002", msg: "登陆失败，请重试" });
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
