var Sequelize = require('sequelize');
var sequelize = require('../config/connect.js');

var Comment = sequelize.define('Comment', {
  content: {
    type: Sequelize.STRING
  }
});

module.exports = Comment;