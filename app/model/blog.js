'use strict';

module.exports = app => {
  const { TEXT, STRING, INTEGER, DATE } = app.Sequelize

  const Blog = app.model.define('Blog', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING,
    description: TEXT,
    content: TEXT
  })

  Blog.associate = function () {
    app.model.Blog.belongsTo(app.model.User, { foreignKey: 'user', targetKey: 'id' })
  }

  return Blog
}
