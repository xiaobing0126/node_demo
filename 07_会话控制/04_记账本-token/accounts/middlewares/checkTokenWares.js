const jwt = require("jsonwebtoken");

const JWT_SECRET = require("../config/config").JWT_SECRET;

module.exports = function checkTokenWares(req, res, next) {
  // 从请求头获取 token
  const token = req.headers["token"];
  console.log("请求头中的 token 是：", token);

  if (!token) {
    return res.json({ code: "1001", msg: "大哥您未提供token啊!" });
  }

  // 验证 token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token 验证失败：", err);
      return res.json({ code: "1002", msg: "大哥给的无效的token" });
    }

    console.log("Token 验证成功，解码内容：", decoded);
    // 可以将解码后的信息存储在请求对象中，供后续中间件或路由处理使用
    req.user = decoded;
    next();
  });
};
