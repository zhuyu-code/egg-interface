'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/product/:productId/project', controller.project.findProjectAll);
  router.get('/project/:projectId',controller.project.findProjectOne)
  router.get('/product/:productId/project/search', controller.project.findProjectSearch);
  router.get('/product/project/:projectId/date',controller.project.findProjectSort)
  router.post('/product/:productId/project',controller.project.addProject);
  router.put('/product/project/:projectId',controller.project.updateProject);
  router.del('/product/project/:projectId',controller.project.deleteProject);
};
