'use strict';
const userRouter = require('./routers/user');

const homeRouter = require('./routers/home');
const searchRouter = require('./routers/search');
const handlemapRouter=require('./routers/handlemap');
const showRouter=require('./routers/show');
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  userRouter(app);
  homeRouter(app);
  searchRouter(app);
  handlemapRouter(app);
  showRouter(app);
};
