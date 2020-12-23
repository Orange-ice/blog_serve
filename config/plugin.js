'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize : {
    enable: true,
    package: 'egg-sequelize'
  }
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};

// 鉴权jwt插件
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};
