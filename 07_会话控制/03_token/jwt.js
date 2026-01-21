//导入 jwt
const jwt = require("jsonwebtoken");

//创建(生成) token
// let token = jwt.sign(用户数据, 加密字符串, 配置对象);
// let token = jwt.sign(
//   {
//     username: "zhangsan",
//   },
//   "atguigu",
//   {
//     expiresIn: 60, //单位是秒
//   }
// );
// console.log(token);

let t =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwiaWF0IjoxNzY4ODkwNzA1LCJleHAiOjE3Njg4OTA3NjV9.V8uFmjoZNVZF3JDqmeDW9N5_q617rXVpk8oN8zP5RcM";
//校验 token
jwt.verify(t, "atguigu", (err, data) => {
  if (err) {
    console.log("校验失败~~");
    return;
  }
  console.log(data);
});
