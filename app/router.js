'use strict';

const errorRouter = require('./routers/error');
const searchRouter = require('./routers/search');
const handlemapRouter=require('./routers/handlemap');
const productRouter=require('./routers/product');
const versionRouter=require('./routers/version');
const projectRouter=require('./routers/project');
const userRouter=require('./routers/user')
module.exports = app => {
  errorRouter(app);
  searchRouter(app);
  handlemapRouter(app);
  productRouter(app);
  versionRouter(app);
  projectRouter(app);
  userRouter(app)
};
