const User = require('../models/Sequelize/User')
const Income = require('../models/Sequelize/Income')
const Revenue = require('../models/Sequelize/Revenue')
const asyncHandler = require('../middleware/async')

// @desc    Create Income coming in
// @role    User
// @route   POST /new
// @access  Private
exports.newIncome = async (req, res, next) => {
  const userID = req.user.id
  const { name, total } = req.body
  const income = await Income.create({ userID, name, total })
  if (!income || userID == null) {
    return next(
      res.status(404).json({
        success: false,
        error: 'Something went wrong',
      })
    )
  }
  res.status(201).json({
    success: true,
    data: income,
  })
}

exports.getIncome = asyncHandler(async (req, res, next) => {
  const userID = req.user.id
  const id = req.params.id
  const income = await Income.findByPk(id,  { include: [
          {
            model: Revenue,
            as: "revenues",
            attributes: ["id", "name", "amount", "type"]
          },
        ], })

  if (userID !== income.userID) {
    return next(
      res.status(401).json({
        success: false,
        error: 'Not Authorised to access this income',
      })
    )
  }
  res.status(200).json({
      success: true,
      income: income
  })
})
exports.newRevenue = asyncHandler(async (req, res, next) => {
  const userID = req.user.id
  const income = await Income.findByPk(req.params.id)
  if (!income) {
    return next(
      res.status(404).json({
        success: false,
        error: `Invalid income with id ${req.params.id}`,
      })
    )
  }
  const incomeID = income.id
  const revenues = req.body
  revenues.forEach(async ({ name, type, date, amount }) => {
    const revenue = await Revenue.create({
      name,
      type,
      date,
      amount,
      userID,
      incomeID,
    })
  })
  if (!revenues) {
    return next(
      res.status(404).json({
        success: false,
        error: 'Something went wrong',
      })
    )
  }
  res.status(201).json({
    success: true,
    data: revenues,
  })
})
exports.getAllMonthlyTransactions = (req, res, next) => {}

exports.addNewTransaction = (req, res, next) => {
  // const userId = req.params.userId
}

exports.addNewTransactionViaExcel = async (req, res, next) => {}

exports.editTransaction = async (req, res, next) => {}

exports.getAllMonthlyTransactionsPerMonth = async (res, req, next) => {}
