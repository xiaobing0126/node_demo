module.exports = function checkIsLogin(req, res, next) {
  if (req.session && req.session.user) {
    // 已登录，继续后续操作
    next();
  } else {
    // 未登录，重定向到登录页面
    res.redirect("/auth/login");
  }
};
