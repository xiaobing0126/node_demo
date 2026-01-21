var express = require("express");
var router = express.Router();
const formidable = require("formidable");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* 上传头像页面 */
router.get("/portrait", function (req, res, next) {
  res.render("portrait");
});

console.log(__dirname);

/* 上传头像结果 */
// router.post("/portrait", function (req, res, next) {
//   // res.send("上传成功");

//   // 处理上传的文件内容
//   const form = new formidable.IncomingForm({
//     multiples: true,
//     uploadDir: __dirname + "/../public/images", // 设置保存图片的路径
//     keepExtensions: true, // 保留文件后缀名
//   });

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.json({ fields, files });

//     // console.log(fields); // 一般字段
//     // console.log(files); // 文件字段

//     // let url = "/images/" + files.portrait.newFilename; // 将来将此数据保存在数据库中

//     // const fileInfo = files.portrait;
//     // console.log(fileInfo);
//     // if (fileInfo) {
//     //   const newFilename = fileInfo.newFilename;
//     //   // console.log(newFilename);
//     // }
//     res.send("ssss");
//   });
// });

//处理文件上传
router.post("/portrait", (req, res) => {
  // 创建 form 对象
  // 存储路径
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: __dirname + "/../public/images",
    keepExtensions: true,
  });

  let uploadedFilename = "";

  // 监听 file 事件，在文件被保存时获取文件名
  form.on("file", (formname, file) => {
    console.log("文件信息:", file);
    // 在 3.5.4 版本中，使用 newFilename 或从 filepath 提取文件名
    uploadedFilename = file.newFilename || file.filename;
    console.log("新文件名:", uploadedFilename);
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!uploadedFilename) {
      return res.status(400).json({ error: "文件上传失败" });
    }

    // 服务器保存该图片的访问 URL
    const url = "/images/" + uploadedFilename;
    res.send(url);
  });
});

module.exports = router;
