const mongoose = require("mongoose");

// 4.创建集合规则（Schema）
// 创建集合规则
let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

// 创建集合对象
let UserModel = mongoose.model("users", UserSchema);

// 获取当天
function getCurDay() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

module.exports = UserModel;
