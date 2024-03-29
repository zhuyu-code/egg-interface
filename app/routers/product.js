'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get("/product", controller.product.findProductAll);
  router.get("/product/search",controller.product.findProductSearch)
  router.post('/product', controller.product.addProduct);
  router.put('/product/:productId', controller.product.updateProduct);
  router.del('/product/:productId', controller.product.deleteProduct);
};
