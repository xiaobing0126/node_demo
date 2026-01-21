// 导入express
const express = require("express");
const fs = require("fs");
// 读取歌曲json文件
const file = fs.readFileSync("./singer.json");
const { singers } = JSON.parse(file.toString());
// console.log(singers);

// 创建应用对象
const app = express();

// 创建路由
app.get("/singer/:id.html", (req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8");
  // 获取路由参数
  let { id } = req.params;
  console.log(id);
  const singerRes = singers.find((item) => item.id === Number(id));
  console.log(singerRes);
  if (!singerRes) {
    res.end("404 not found");
    return;
  }

  res.end(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>歌曲</title>
        </head>
        <body>
            <div>${singerRes.singer_name}</div>
            <div>${singerRes.other_name}</div>
            <img src="${singerRes.singer_pic}" alt="" />
        </body>
    </html>
    `);
});

app.listen(3000, () => {
  console.log("服务已经启动");
});
