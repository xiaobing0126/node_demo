// 导入express
const express = require("express");

// 创建应用对象
const app = express();

// 创建路由
app.get("/search/:id.html", (req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8");
  // 获取路径参数(拼接在？后面的)
  console.log(req.query);
  // 获取路由参数（拼接在/后面的）
  console.log(req.params);
  res.end("商品详情");
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
