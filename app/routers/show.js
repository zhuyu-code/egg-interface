'use strict';
module.exports= app =>{
    const {router,controller}=app;
    router.get("/product",controller.show.findProductAll);
    router.get("/project",controller.show.findProjectAll);
}