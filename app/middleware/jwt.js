const JWT = require('jsonwebtoken');

module.exports = (options,app) => {
  return async function(ctx, next) {
    // 拿到传会数据的header 中的token值
    const token = ctx.request.headers.authorization;
    const method = ctx.method.toLowerCase();
     if (!token) {
       console.log(ctx);
      if (ctx.path === '/register' || ctx.path === '/login'||ctx.request.url==='/fileuploadsStreams'||ctx.request.url==='/handlemap') {
        // before in
        await next();
        //after
      } else {
        ctx.throw(401, '未登录， 请先登录');
      }
    } else { // 当前token值存在
      let decode;
      try {
        // 验证当前token
        try {
          decode = JWT.verify(token, options.secret);
        } catch (error) {
          ctx.throw(401,"无效的权限")
        }
        if (!decode || !decode.userName) {
          ctx.throw(401, '没有权限，请登录');
        }

        if (Date.now() - decode.expire > 0) {
          ctx.throw(401, 'Token已过期');
        }
        const user = await app.mysql.get('user',{
          userName: decode.userName,
        });
        console.log(user);
        if (user) {
          await next();
        } else {
          ctx.throw(401, '用户信息验证失败');
        }
      } catch (e) {
        console.log("响应")
        console.log(ctx.response);
      }
    }
  };
};
