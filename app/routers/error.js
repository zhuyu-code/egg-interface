'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/product/project/version/:versionId/errorList', controller.error.findAllError);
  router.get('/product/project/:projectId/errorList', controller.error.findProjectIdError);
  router.get('/product/project/version/:versionId/errorList/date', controller.error.findErrorSort);
};
