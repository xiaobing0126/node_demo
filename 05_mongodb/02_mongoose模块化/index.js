// 引入db.js，完成数据库连接封装
const db = require("./db/db");
const mongoose = require("mongoose");

// 引入model
const bookModel = require("./model/bookModel");

// 调用封装的数据库连接函数
db(
  () => {
    console.log("数据库连接成功");
    // 插入数据
    // bookModel
    //   .create({ name: "西游记5", author: "宗炳林", price: 19999 })
    //   .then((data) => {
    //     console.log("插入数据成功", data);
    //   })
    //   .catch((err) => {
    //     console.error("插入数据失败", err);
    //   });

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
      bookModel
        .find({ name: "西游记5" })
        .then((data) => {
          console.log("查询数据成功", data);
        })
        .catch((err) => {
          console.error("查询数据失败", err);
        });

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
  },
  (err) => {
    console.error("数据库连接失败", err);
  },
  () => {
    console.log("数据库连接关闭回调");
  }
);

// 8.导出mongoose
module.exports = mongoose;
