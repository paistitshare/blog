var Sequelize = require('sequelize')
var sequelize = require('../config/connect.js')

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      is: /^[a-z0-9\_\-]+$/i
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  shortly: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  interests: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  language: {
    type: Sequelize.STRING,
    defaultValue: 'English'
  },
  theme: {
    type: Sequelize.STRING,
    defaultValue: 'Light'
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue: 'http://bit.ly/1Uawe8m'
  },
  facebookid: Sequelize.STRING,
  facebooktoken: Sequelize.STRING,
  facebookemail: Sequelize.STRING,
  facebookname: Sequelize.STRING,
  twitterid: Sequelize.STRING,
  twittertoken: Sequelize.STRING,
  twittername: Sequelize.STRING,
  vkontakteid: Sequelize.STRING,
  vkontaktetoken: Sequelize.STRING,
  vkontakteemail: Sequelize.STRING,
  vkontaktename: Sequelize.STRING,
},{
  freezeTableName: true
});

module.exports = User;