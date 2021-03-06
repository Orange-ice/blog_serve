'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize
    await queryInterface.createTable('blogs',
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        title: STRING,
        description: TEXT,
        content: TEXT,
        created_at: DATE,
        updated_at: DATE,
        user: INTEGER
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blogs');
  }
};
