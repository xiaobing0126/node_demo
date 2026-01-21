var express = require("express");
var router = express.Router();

// 导入lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(__dirname + "/../data/accounts.json");
//获取 db 对象
const db = low(adapter);
//导入 shortid
const shortid = require("shortid");
// 时间格式 -> 将字符串yyyy-mm-dd 转为 Date 对象
const moment = require("moment");

// 导入模型
const AccountModel = require("../model/AccountModel");

// 账户列表
router.get("/list", async function (req, res, next) {
  //   res.send("账户列表");
  // 这个list对应view/list.ejs文件
  // 获取data/accounts.json数据
  // let accounts = db.get("accounts").value();
  // console.log("列表数据---", accounts);

  // 获取 mongodb 数据库中的数据
  await AccountModel.find()
    .sort({ time: -1 })
    .lean()
    .then((data) => {
      data.forEach((item) => {
        item.time = moment(item.time).format("YYYY-MM-DD");
      });
      console.log("列表数据2222---", data);
      res.render("list", { accounts: data });
    })
    .catch((err) => {
      console.error("获取列表数据失败", err);
    });
});

// 创建账单页面 - 必须放在 /:id 之前，否则 create 会被当作 id 参数
router.get("/create", function (req, res, next) {
  //   res.send("账户创建");
  res.render("create");
});

// 删除订单--路由理解成【请求路径】
router.get("/:id", function (req, res, next) {
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
  res.render("success", { msg: "删除成功，可前往列表查看" });
});

// 创建账单请求
router.post("/create", function (req, res, next) {
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
      res.render("success", { msg: "添加成功，可前往列表查看" });
    })
    .catch((err) => {
      console.error("添加失败", err);
    });
});

module.exports = router;
