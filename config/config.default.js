/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1575269908956_2905';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

//配置mysql
config.mysql = {
  client: {
      // host
      host: '122.51.175.158',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'Test',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
}

//配置csrf的跨域攻击
config.security = {
  csrf: {
    enable: false,
  },
  domainWhiteList: [ 'http://localhost:8080' ],
};
//配置支持file模式
exports.multipart = {
  mode: 'stream',
  fileExtensions:[".xlsx",".xls",".dmg",".map"]//配置扩展名白名单
};

//配置表单字段大小
exports = {
  bodyParser: {
    jsonLimit: '1mb',
    formLimit: '1mb',
  },
};

  return {
    ...config,
    ...userConfig,
  };
};
