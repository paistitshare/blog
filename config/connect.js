var Sequelize = require('sequelize')

var sequelize = new Sequelize('blog', 'root', 'qweasd123321', {
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb'
});

module.exports = sequelize