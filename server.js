const express = require('express')
const dotenv = require('dotenv')
const db = require('./config/db')
const app = express()

// Enviromental Variables
dotenv.config({
  path: './config/config.env',
})

db.authenticate()
  .then(() => 'Database connected...')
  .catch((err) => {
    console.log(err)
  })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const authRouter = require('./routers/auth')
const userRouter = require('./routers/users')
const incomeRouter = require('./routers/income')

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/income', incomeRouter)
const port = process.env.PORT || 2000
app.listen(
  port,
  console.log(`Server is running on port ${port} on ${process.env.MODE} mode`)
)
