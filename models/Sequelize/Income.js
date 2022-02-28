const Sequelize = require('sequelize')
const db = require('../../config/db')
const User = require('./User')
const Revenue = require('./Revenue')

const Income = db.define('income', {
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  total: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  remainder: {
    type: Sequelize.DECIMAL,
    allowNull: true,
  },
})
Income.belongsTo(User, {
  foreignKey: 'userID',
})

Income.hasMany(Revenue, {
  as: 'revenues',
})

// Income.belongsToMany(Revenue, {
//   through: "revenue_income",
//   as: 'revenues',
//   foreignKey: "incomeID"
// })

module.exports = Income
