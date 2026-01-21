const ejs = require("ejs");
const fs = require("fs");
console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/01_list.html`).toString();

const express = require("express");
const app = express();

// 模版引擎的作用：将js跟html分离
let arr = ["唐僧", "孙悟空", "猪八戒", "沙师弟"];

let result = ejs.render(
  //   `
  //         <ul>
  //             <% arr.forEach(item => { %>
  //                 <li><%= item %></li>
  //             <% }) %>
  //         </ul>
  //     `,
  file,
  { arr }
);
console.log(result);

app.get("/", (req, res) => {
  res.send(result);
});

app.listen(3000, () => {
  console.log("服务已经启动了。。。。");
});
