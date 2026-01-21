import { JSONFilePreset } from "lowdb/node";

// Read or create db.json
const defaultData = { posts: [] };
const db = await JSONFilePreset("db.json", defaultData);

// 只在 posts 为空时才添加数据
// 因为我用nodemon执行，所以会一直添加
if (db.data.posts.length < 5) {
  db.data.posts.push("hello world");
  await db.write();
  console.log("数据已添加");
} else {
  console.log("数据已存在，跳过添加");
}

// 获取数据
let results = db.data.posts;
console.log("当前数据：", results);

// 删除数据 - 方法1：删除指定索引的数据
// db.data.posts.splice(0, 1); // 删除第一条数据
// await db.write();

// 删除数据 - 方法2：删除指定值的数据
// db.data.posts = db.data.posts.filter(item => item !== "hello world");
// await db.write();

// 删除数据 - 方法3：清空所有数据
db.data.posts = [];
await db.write();

console.log("删除后的数据：", db.data.posts);
