const JWT = require('jsonwebtoken');

module.exports = (options,app) => {
  return async function(ctx, next) {
    // 拿到传会数据的header 中的token值
    const token = ctx.request.headers.authorization;
    const method = ctx.method.toLowerCase();
     if (!token) {
      if (ctx.path === '/register' || ctx.path === '/login') {
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
        decode = JWT.verify(token, options.secret);
        if (!decode || !decode.userName) {
          ctx.throw(401, '没有权限，请登录');
        }

        if (Date.now() - decode.expire > 0) {
          ctx.throw(401, 'Token已过期');
        }
        const user = await app.mysql.get('user',{
          userName: decode.userName,
        });
        if (user) {
          await next();
        } else {
          ctx.throw(401, '用户信息验证失败');
        }
      } catch (e) {
        console.log(ctx.response);
      }
    }
  };
};
