const mongoose = require("mongoose");

// 4.创建集合规则（Schema）
// 创建集合规则
let AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  type: {
    type: Number,
    enum: [1, -1], // 1:收入 -1:支出
    default: -1,
  },
  account: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
  },
});

// 创建集合对象
let AccountModel = mongoose.model("accounts", AccountSchema);

// 获取当天
function getCurDay() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

module.exports = AccountModel;
