'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize
    // 执行数据库升级调用的函数，创建 users 表
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING,
      avatar: STRING,
      password: TEXT,
      created_at: DATE,
      updated_at: DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    // 执行数据库降级时调用的函数，删除 users 表
    await queryInterface.dropTable('users')
  }
};
