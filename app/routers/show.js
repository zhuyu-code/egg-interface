'use strict';
module.exports= app =>{
    const {router,controller}=app;
    router.get("/product",controller.show.findProductAll);
    router.post('/product',controller.show.addProduct);
    router.get("/project",controller.show.findProjectAll);
    router.post("/project",controller.show.addProject);
}