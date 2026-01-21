# node_demo

node项目学习

# 记账本项目启动

## 完整的项目在07*会话控制/04*记账本-token/accounts文件夹下

1. 克隆项目到本地

```bash
git clone https://github.com/xiaobing0126/node_demo.git
```

2. 进入项目目录

```bash
cd node_demo/07*会话控制/04*记账本-token/accounts
```

3. 安装依赖

```bash
npm install
```

4. 启动项目

```bash
npm start
```

5. 访问项目
   打开浏览器，访问 http://localhost:3000

6. 使用Postman测试API

7. 测试账号
   haha1 111
   haha2 111
   haha3 111
   haha3 111
   haha4 111
   haha5 111
   haha6 111
   haha7 111
   bing1 111
   bing2 111
   haha 111

8. 数据库
   使用MongoDB数据库，数据库名称为bilibili
   集合名称为accounts
   记账数据存储在accounts集合中
   用户数据存储在users集合中

9. 注意事项
   确保MongoDB服务已启动
   确保端口3000未被占用
   如果需要修改端口或数据库配置，请在app.js&config.js文件中进行修改
