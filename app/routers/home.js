'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/errorList', controller.home.findHot);
};
