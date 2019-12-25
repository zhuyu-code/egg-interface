'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/product/:productId/project/:projectId/version/:versionId/errorList', controller.error.findAllError);
};
