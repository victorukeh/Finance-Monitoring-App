const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/auth')

const {getUser, getUsers, EditUser} = require('../controllers/users.js')

router.route('/').get(protect, getUsers)
router.route('/:id').get(protect, getUser).put(protect, EditUser)

module.exports = router
