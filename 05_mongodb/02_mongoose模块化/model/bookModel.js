const mongoose = require("mongoose");

// 4.创建集合规则（Schema）
// 创建集合规则
let bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "匿名", // 枚举
  },
  price: Number,
});

// 创建集合对象
let bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
