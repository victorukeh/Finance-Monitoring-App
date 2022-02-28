const Sequelize = require('sequelize')
module.exports  =  new Sequelize('orionet', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: '0',
  pool:{
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 1000
  },
})


