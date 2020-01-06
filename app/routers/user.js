'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/register', controller.user.register);// 上传单个文件
  router.post('/login', controller.user.login);// 上传多个文件
};
