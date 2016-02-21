var Sequelize = require('sequelize');
var sequelize = require('../config/connect.js');

var Rate = sequelize.define('Rate', {
    rate: {
        type: Sequelize.INTEGER
    }
});
module.exports = Rate;