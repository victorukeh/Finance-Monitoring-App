const express = require('express')
const router = express.Router()

const { login, register } = require('../controllers/auth')

router.route('/login').post(login)
router.route('/register').post(register)
// router.route('/:id').get(getUser).put(EditUser)

module.exports = router
