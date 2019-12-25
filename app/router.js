'use strict';
const userRouter = require('./routers/user');

const errorRouter = require('./routers/error');
const searchRouter = require('./routers/search');
const handlemapRouter=require('./routers/handlemap');
const productRouter=require('./routers/product');
const versionRouter=require('./routers/version');
const projectRouter=require('./routers/project');
module.exports = app => {
  userRouter(app);
  errorRouter(app);
  searchRouter(app);
  handlemapRouter(app);
  productRouter(app);
  versionRouter(app);
  projectRouter(app);
};
