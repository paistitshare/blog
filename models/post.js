var Sequelize = require('sequelize')
var sequelize = require('../config/connect.js')

var Post = sequelize.define('Post', {
  post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
  }
});

module.exports = Post