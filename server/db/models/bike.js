const Sequelize = require('sequelize')
const db = require('../db')

const Bike = db.define('bike', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  miles: {
    type: Sequelize.FLOAT
  }
})

module.exports = Bike
