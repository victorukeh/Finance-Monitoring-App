const Sequelize = require('sequelize')
const Transaction = require('./Transaction')
const User = require('./User')

const Funds = db.define('fund', {
  transactionID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  type: {
    type: Sequelize.ENUM("Savings", "Expenses"),
    allowNull: false,
  },
})
Funds.belongsTo(Transaction, {
  foreignKey: 'transactionID',
  // , targetKey: 'id'
})
Funds.belongsTo(User, {
    foreignKey: 'userID',
    // , targetKey: 'id'
  })

module.exports = Funds
