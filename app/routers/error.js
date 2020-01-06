'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/product/project/version/:versionId/errorList', controller.error.findAllError);
  router.get('/product/project/version/:versionId/errorList/sort', controller.error.findErrorSort);
};
