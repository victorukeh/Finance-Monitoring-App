const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const {
  newIncome,
  newRevenue,
  getIncome,
} = require('../controllers/transactions')

router.route('/new').post(protect, newIncome)
router.route('/new/:id').post(protect, newRevenue)
router.route('/:id').get(protect, getIncome)


module.exports = router
