'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/project', controller.project.findProjectAll);
  router.post('/project',controller.project.addProject)
};
