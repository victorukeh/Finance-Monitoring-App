const Sequelize = require('sequelize')
const db = require('../../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = db.define(
  'user',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      },
    },
  }
)

User.prototype.getSignedJwtToken = function () {
  console.log(this.id)
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  )
}

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
module.exports = User
