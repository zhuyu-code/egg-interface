'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
  // enable: true,
  // package: 'egg-mysql',
// };
// config/plugin.js
//配置mysql内容
exports.mysql = {
  enable: true,// 开启
  package: 'egg-mysql', // 对应哪个包
};
//配置跨域插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
//配置校验插件
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
