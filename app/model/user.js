'use strict'

const shajs = require('sha.js')
const hash = raw => shajs('sha256').update(raw).digest('hex')

module.exports = app => {
  const { TEXT, STRING, INTEGER, DATE } = app.Sequelize

  const User = app.model.define('User', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING,
    avatar: STRING,
    password: {
      type: TEXT,
      set(value) {
        this.setDataValue('password', hash(value))
      }
    }
  })
  User.associate = function () {
    app.model.User.hasMany(app.model.Blog, {foreignKey: 'id'})
  }
  return User
}
