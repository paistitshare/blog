var Sequelize = require('sequelize');
var sequelize = require('../config/connect.js');

var Like = sequelize.define('Like', {
});

module.exports = Like;