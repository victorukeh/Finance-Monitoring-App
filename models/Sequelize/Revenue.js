const Sequelize = require('sequelize')
const db = require('../../config/db')
const User = require('./User')
const Income = require('./Income')

const Revenue = db.define('revenue', {
  incomeID: {
    type: Sequelize.INTEGER,
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
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(
      'Wages',
      'CapitalGain',
      'Dividend',
      'Commision',
      'Royalties',
      'Salary',
      'UnearnedIncomes',
      'Investment',
      'BussinessIncome',
      'InKindIncome',
      'PersonalIncome'
    ),
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})

Revenue.belongsTo(User, {
  foreignKey: 'userID',
})
module.exports = Revenue
