const User = require('../models/Sequelize/User')
const asyncHandler = require('../middleware/async')

// @desc    Get user details by user id
// @role    Admin
// @route   GET /user/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findByPk(userId)
  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    })
  } else {
    res.status(200).json({
      success: true,
      error: 'User does not exist' ,
    })
  }
})

// @desc    Get all users
// @role    Admin
// @route   GET /users
// @access  Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll()
  if (!users) {
    res.status(200).json(res.advancedResults)
  }else{
    res.status(200).json({
      success: true,
      data: users,
    })
  }

})

// @desc    Edit your account details
// @route   PUT /user/:id
// @access  Private
exports.EditUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({
        success: true,
        message: `User not found with an id of ${req.params.id}`
      })
    } else {
     const [updated] =  await User.update(req.body, {
        where: { id: userId },
      })
      if(updated){
        const updatedUser = await User.findOne({where: {id: userId}})
        return res.status(200).json({
          success: true,
          data: updatedUser
        })
      }
    }
})
