# ejs 语法：模版引擎的作用是将 js 跟 html 分离

1.  <%= 变量名 %>

let arr = ["唐僧", "孙悟空", "猪八戒", "沙师弟"];

let result = ejs.render(
`    <ul>
              <% arr.forEach(item => { %>
                  <li><%= item %></li>
              <% }) %>
          </ul>`,
,
{ arr }
);
console.log(result);

2.循环遍历
<% arr.forEach(item => { %>

<% }) %>
