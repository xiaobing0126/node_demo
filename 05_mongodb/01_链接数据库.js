// 1.安装mongoose
// 2.引入mongoose
const mongoose = require("mongoose");

// 3.连接数据库
// bilibili数据库名称，没有则会创建
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4.获取连接对象
const db = mongoose.connection;

// 5.绑定连接完成的监听
db.once("open", () => {
  console.log("数据库连接成功");

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

  // 插入数据
  //   bookModel
  //     .create({ name: "西游记4", author: "吴承恩", price: 20 })
  //     .then((data) => {
  //       console.log("插入数据成功", data);
  //     })
  //     .catch((err) => {
  //       console.error("插入数据失败", err);
  //     });

  setTimeout(() => {
    // 删除一条数据
    // bookModel
    //   .deleteOne({ _id: "69675a852b7120a5ae03bc96" })
    //   .then((data) => {
    //     console.log("删除数据成功", data);
    //   })
    //   .catch((err) => {
    //     console.error("删除数据失败", err);
    //   });
    // 删除所有数据
    // bookModel
    //   .deleteMany({})
    //   .then((data) => {
    //     console.log("删除所有数据成功", data);
    //   })
    //   .catch((err) => {
    //     console.error("删除所有数据失败", err);
    //   });

    // 更新数据
    // bookModel
    //   .updateOne({ _id: "69675c3e985851ae1d8806ef" }, { price: 999.99 })
    //   .then((data) => {
    //     console.log("更新数据成功", data);
    //   })
    //   .catch((err) => {
    //     console.error("更新数据失败", err);
    //   });

    // 更新所有数据
    // bookModel
    //   .updateMany({ author: "吴承恩" }, { author: "佚名" })
    //   .then((data) => {
    //     console.log("更新所有数据成功", data);
    //   })
    //   .catch((err) => {
    //     console.error("更新所有数据失败", err);
    //   });

    // 查询数据
    // 根据ID查询：finedById
    // 批量查询：find
    // bookModel
    //   .find({ name: "西游记4" })
    //   .then((data) => {
    //     console.log("查询数据成功", data);
    //   })
    //   .catch((err) => {
    //     console.error("查询数据失败", err);
    //   });

    // 7. 设置字段
    // bookModel
    //   .find()
    //   .select({ name: 1, author: 1, _id: 0 })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log("查询失败~~");
    //   });

    // 数据排序
    // bookModel
    //   .find()
    //   .select({ name: 1, price: 1, _id: 0 })
    //   .sort({ price: -1 })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log("查询失败~~");
    //   });

    //数据的截取
    bookModel
      .find()
      .select({ name: 1, price: 1, _id: 0 })
      .sort({ price: -1 })
      .skip(3)
      .limit(3)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("查询失败~~");
      });
  }, 2000);
});

// 6.绑定连接错误的监听
db.on("error", (err) => {
  console.error("数据库连接失败", err);
});

// 7.链接关闭的回调
db.on("close", () => {
  console.log("数据库连接关闭");
});

// 关闭数据库连接
// setTimeout(() => {
//   db.close();
// }, 3000);

// 8.导出mongoose
module.exports = mongoose;
