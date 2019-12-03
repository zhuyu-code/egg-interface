
# 启动命令
```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署命令

```bash
$ npm start
$ npm stop
```
### 插件
`markdown-preview-enhanced`在vscode中markdown
#易错问题解决
1. csrf解决（在使用post请求接口的时候会报错）
解决： 在config配置项里面config.default.js里面添加
```
config.security = {
  csrf: {
    enable: false,
  },
};
```
2. 配置连接mysql
* 在config.default.js里面配置内容
```
//配置mysql
config.mysql = {
  client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '128038zy',
      // 数据库名
      database: 'Test',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
}
```
* 在plugin.js里面打开指定插件
```
exports.mysql = {
  enable: true,// 开启
  package: 'egg-mysql', // 对应哪个包
};
```
3. 修改端口
在config.default.js里面加入配置config的文件
```
config.cluster = {
      listen: {
        path: '',
        port: 8000,
        hostname: '0.0.0.0',
      }
  };
```
# 参考文章
1. [egg项目搭建](https://juejin.im/post/5bf362f0e51d4543850ff46c)
2. egg源码解读(https://juejin.im/post/5be92cc95188251fd925d49b)
3. egg官网(https://eggjs.org/zh-cn/basics/middleware.html)