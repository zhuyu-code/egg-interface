'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/handlemap', controller.handlemap.findmap);//上传表单处理map接口
};