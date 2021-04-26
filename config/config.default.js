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
  config.middleware = ['auth'];
  // 无需验证token有效性的路由
  config.whiteRouter = ['/auth/register', '/auth/login', '/blog']

  config.jwt = {
    secret: 'burt1998'
  }
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080', 'http://orange_ice.gitee.io', 'https://orange_ice.gitee.io'], //配置白名单
  }
  config.cors = {
    credentials: true, // 允许跨域请求携带cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
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
