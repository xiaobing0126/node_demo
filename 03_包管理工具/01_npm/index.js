// 导入uniq
// const uniq = require("uniq");

// 导入其实是到node_modules文件夹中去找uni.js --> 也就是node_modules/uniq/package.json中的main对象的值
const uniq = require("uniq");

let arr = [1, 2, 3, 4, 2, 3];
arr = uniq(arr);
console.log(arr);
