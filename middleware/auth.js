const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const User = require('../models/Sequelize/User')

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //Set token from bearer token header
    token = req.headers.authorization.split(' ')[1]
  }
  //Set token from cookie
//   else if (req.cookies.token) {
//     token = req.cookies.token
//   }

  if (!token) {
    return res.status(401).json({
        success: false,
        error: `Not authorized to access this route`
    })
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    req.user = await User.findByPk(decoded.id)
    // console.log(req.user.id)
    next()
  } catch (err) {
    return res.status(401).json({
        success: false,
        error: `Not authorized to access this route`
    })
  }
})

//Spread operator allows an iterable to expand in places where 0+ arguments are expected.
//It is mostly used in the variable array where there is more than 1 values are expected.
//It allows us the privilege to obtain a list of parameters from an array.
// Syntax of Spread operator is same as Rest parameter but it works completely opposite of it.

//Grant access to specific roles
// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     // if user's role is not among the set roles in "...roles" then
//     console.log(req.user)
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorResponse(
//           `User role ${req.user.role} is not authorised to access this route`,
//           403
//         )
//       )
//     }
//     next()
//   }
// }
