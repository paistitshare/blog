var Sequelize = require('sequelize')
var sequelize = require('../config/connect.js')

var Tag = sequelize.define('Tag', {
  tag_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

module.exports = Tag