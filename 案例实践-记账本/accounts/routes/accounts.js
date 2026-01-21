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

router.get("/list", function (req, res, next) {
  //   res.send("账户列表");
  // 这个list对应view/list.ejs文件
  // 获取data/accounts.json数据
  let accounts = db.get("accounts").value();
  console.log("列表数据---", accounts);
  res.render("list", { accounts });
});

// 删除订单--路由理解成【请求路径】
router.get("/:id", function (req, res, next) {
  let id = req.params.id;
  console.log("id---", id);
  db.get("accounts").remove({ id: id }).write();
  res.render("success", { msg: "删除成功，可前往列表查看" });
});

// 创建页面
router.get("/create", function (req, res, next) {
  //   res.send("账户创建");
  res.render("create");
});

// 提交创建页面
router.post("/create", function (req, res, next) {
  console.log(req.body);
  // 保存数据到data/accounts.json中
  //生成 id
  let id = shortid.generate();
  //写入文件
  db.get("accounts")
    .unshift({ id: id, ...req.body })
    .write();
  res.render("success", { msg: "添加成功，可前往列表查看" });
});

module.exports = router;
