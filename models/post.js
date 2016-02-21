var Sequelize = require('sequelize');
var sequelize = require('../config/connect.js');

var Post = sequelize.define('Post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  video: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  }
});

module.exports = Post;