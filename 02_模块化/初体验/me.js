function test() {
  console.log("测试数据");
}

// 第一种暴露数据
// module.exports = test;

// 第二种暴露数据
// exports.aaa = test;

// 第三种暴露
// module.exports = {
//   aaa: test,
// };

//1. module.exports 可以暴露`任意`数据
// module.exports = 'iloveyou';
// module.exports = 521;

//2. 不能使用 `exports = value`的形式暴露数据
// exports = 'iloveyou' // X

exports = module.exports = {};
console.log(module.exports);
console.log(module.exports === exports);
