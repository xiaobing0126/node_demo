const express = require("express");
const router = express.Router();

// 导入jwt -> 校验token，符合才显示列表
const jwt = require("jsonwebtoken");

// 时间格式 -> 将字符串yyyy-mm-dd 转为 Date 对象
const moment = require("moment");

// 导入模型
const AccountModel = require("../../model/AccountModel");

// 导入校验token的中间件
const checkTokenWares = require("../../middlewares/checkTokenWares");

// 账户列表
router.get("/accounts", checkTokenWares, async function (req, res, next) {
  //   res.send("账户列表");
  // 这个list对应view/list.ejs文件
  // 获取data/accounts.json数据
  // let accounts = db.get("accounts").value();
  // console.log("列表数据---", accounts);

  console.log("output->获取中间件checkTokenWares的用户信息", req.user);

  // 校验 token
  // let token = req.headers.token;
  // console.log("output->", req.headers);
  // if (!token) {
  //   return res.json({ error: "未提供token" });
  // }
  // token = token.replace("Bearer ", "");
  // try {
  //   jwt.verify(token, "xiaobingzi");
  // } catch (err) {
  //   return res.json({ error: "无效的token" });
  // }

  // 获取 mongodb 数据库中的数据
  await AccountModel.find()
    .sort({ time: -1 })
    .lean()
    .then((data) => {
      data.forEach((item) => {
        item.time = moment(item.time).format("YYYY-MM-DD");
      });
      console.log("列表数据2222---", data);
      // 这里是直接去渲染ejs中的页面，没有做到前后端分离，因此，直接返回前端 JSON 数据
      // res.render("list", { accounts: data });

      // 直接返回JSON，意味着项目里不需要views文件夹和ejs模板引擎了

      // 下面直接返回前端JSON数据
      res.json({
        code: "0000",
        msg: "获取列表数据成功",
        results: data,
      });
    })
    .catch((err) => {
      console.error("获取列表数据失败", err);

      if (err) {
        res.status(500).json({ error: "获取列表数据失败" });
      }
    });
});

// 创建账单页面 - 必须放在 /:id 之前，否则 create 会被当作 id 参数
// router.get("/create", function (req, res, next) {
//   //   res.send("账户创建");
//   res.render("create");
// });

// 删除订单--路由理解成【请求路径】
router.delete("/accounts/:id", checkTokenWares, function (req, res, next) {
  let id = req.params.id;
  console.log("id---", id);
  // db.get("accounts").remove({ id: id }).write();
  // 删除 mongodb 数据库中的数据
  AccountModel.deleteOne({ _id: id })
    .then((data) => {
      console.log("删除成功", data);
    })
    .catch((err) => {
      console.error("删除失败", err);
    });
  //   res.render("success", { msg: "删除成功，可前往列表查看" });
  res.json({ code: "0000", msg: "删除成功" });
});

// 创建账单请求
router.post("/accounts", checkTokenWares, function (req, res, next) {
  console.log(req.body);
  // 这是写入本地json文件的方法
  // // 保存数据到data/accounts.json中
  // //生成 id
  // let id = shortid.generate();
  // //写入文件
  // db.get("accounts")
  //   .unshift({ id: id, ...req.body })
  //   .write();

  // 保存数据到 mongodb 数据库中
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(), // 注意 time 字段需要转为 Date 对象
  })
    .then((data) => {
      console.log("添加成功", data);
      // res.render("success", { msg: "添加成功，可前往列表查看" });
      res.json({ code: "0000", msg: "添加成功" });
    })
    .catch((err) => {
      console.error("添加失败", err);
    });
});

// 获取单个账单
router.get("/accounts/:id", checkTokenWares, function (req, res, next) {
  let id = req.params.id;
  console.log("id---", id);

  // lean() 方法的作用是把 Mongoose 的文档对象转换为普通的 JavaScript 对象
  AccountModel.findById(id) // 根据id查询
    .lean()
    .then((data) => {
      console.log("查询成功", data);
      res.json({ code: "0000", msg: "查询成功", result: data });
    })
    .catch((err) => {
      console.error("查询失败", err);
      res.status(500).json({ error: "查询失败" });
    });
});

// 更新账单
router.put("/accounts/:id", checkTokenWares, function (req, res, next) {
  let id = req.params.id;
  console.log("id---", id);
  console.log("更新数据---", req.body);

  AccountModel.updateOne(
    { _id: id },
    {
      ...req.body,
      time: moment(req.body.time).toDate(), // 注意 time 字段需要转为 Date 对象
    }
  )
    .then((data) => {
      console.log("更新成功", data);
      res.json({ code: "0000", msg: "更新成功" });
    })
    .catch((err) => {
      console.error("更新失败", err);
      res.status(500).json({ error: "更新失败" });
    });
});

module.exports = router;
