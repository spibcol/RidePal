const Sequelize = require('sequelize')
const db = require('../db')

const Component = db.define('component', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  compMiles: {
    type: Sequelize.FLOAT
  },
  bikeId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Component
