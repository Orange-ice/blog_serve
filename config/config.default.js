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

  // 关闭 egg.js 内置的 csrf 安全校验
  config.security = {
    csrf: {
      enable: false
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1607862460572_466';

  // add your middleware config here
  config.middleware = [];

  config.jwt = {
    secret: 'burt1998'
  }
  config.onerror = {
    all(err, ctx) {
      // 在此处定义对所有响应类型的错误处理方法
      ctx.body = JSON.stringify({
        status: 'fail',
        msg: err.code
      })
      ctx.status = 500
    }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
