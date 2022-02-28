const Sequelize = require('sequelize')
const User = require('./User')

const Transaction = db.define('transaction', {
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})
Transaction.belongsTo(User, {
  foreignKey: 'userID',
  // , targetKey: 'id'
})

Transaction.belongsTo(User, {
  foreignKey: 'userID',
  // , targetKey: 'id'
})

module.exports= Transaction