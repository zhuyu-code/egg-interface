'use strict';

module.exports=(app)=>{
  const {router,controller}=app;
  router.get('/product/project/:projectId/editor',controller.editor.findEditorAll);
  router.post('/product/project/:projectId/editor',controller.editor.uploadEditor)
}
