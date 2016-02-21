var Sequelize = require('sequelize');
var sequelize = require('../config/connect.js');

var Tag = sequelize.define('Tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Tag;