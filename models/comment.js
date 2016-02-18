var Sequelize = require('sequelize')
var sequelize = require('../config/connect.js')

var Comment = sequelize.define('Comment', {
  comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
  comment_content: {
    type: Sequelize.STRING,
  }
});

module.exports = Comment