'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/fileupload', controller.search.upload);//上传单个文件
  router.post('/fileuploads',controller.search.uploads);//上传多个文件
  router.post('/fileuploadStream',controller.search.uploadStream);//上传单个文件流
  router.post('/fileuploadsStreams',controller.search.uploadsStream);//上传多个文件流
};
