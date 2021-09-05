const Sequelize = require('sequelize')
const db = require('../db')

const Bike = db.define('bike', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  make: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
  },
  miles: {
    type: Sequelize.FLOAT
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Bike
