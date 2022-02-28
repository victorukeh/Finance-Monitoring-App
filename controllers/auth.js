const User = require('../models/Sequelize/User')
const asyncHandler = require('../middleware/async')
const { UserSchema } = require('../models/joi/User')

// @desc    Login to your account
// @route   POST /auth/login
// @access  Public 
exports.login = async (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Input username and password',
    })
  }
  const user =
    (await User.findOne({
      where: { email: username },
    })) ||
    (await User.findOne({
      where: { username: username },
    }))
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid Credntials',
    })
  }
  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    res.status(404).json({
      success: false,
      message: 'Invalid Credentials',
    })
  }
  // const token = user.getSignedJwtToken()
  sendTokenResponse(user, 200, res)
}

// @desc    Register your account
// @route   POST /auth/register
// @access  Public 
exports.register = asyncHandler(async (req, res, next) => {
  const { email, username, name, country, phone, password, repeat_password } =
    req.body
  try {
    await UserSchema.validateAsync(req.body)
    const verifyEmail = await User.findOne({ where: { email: email } })
    if (!verifyEmail) {
      const createUser = await User.create({
        email,
        username,
        name,
        country,
        phone,
        password,
      })
      // To be changed later on to response token
      res.status(201).json({
        success: true,
        message: createUser,
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'User exists please login',
      })
    }
  } catch (err) {
    res.status(200).json({
      success: false,
      error: err.details[0].message,
    })
  }
})

//  Set cookie and token for user/admin account
const sendTokenResponse = (user, statusCode, res) => {
  // Create Token
  const token = user.getSignedJwtToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.MODE === 'production') {
    options.secure = true
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token })
}
