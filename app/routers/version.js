'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/product/project/:projectId/version', controller.version.findVersionAll);
};
