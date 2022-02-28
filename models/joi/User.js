const Joi = require('joi')

const UserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().min(11).required(),
  country: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }).required(),
  password: Joi.string(),
  // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password')

module.exports = { UserSchema }
