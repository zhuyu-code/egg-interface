'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/product/:productId/project', controller.project.findProjectAll);
  router.post('/product/:productId/project',controller.project.addProject);
  router.put('/product/:productId/project/:projectId',controller.project.updateProject);
  router.del('/product/:productId/project/:projectId',controller.project.deleteProject);
};
