require('dotenv').config()
const express = require('express')
const checkToken = require('./src/middlewares/checkToken')
const connectDB = require('./src/config/db')
const authRoutes = require('./src/routes/authRoutes')

const app = express()

app.use(express.json())

connectDB().then(() => {
  app.listen({
    host:'0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
})
.catch((err) => {
  console.log(err)
})

const User = require('./src/models/User')


app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo a API' })
})

app.use('/auth', authRoutes);

app.get('/user/:id', checkToken, async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id, '-password')

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' })
  }

  res.status(200).json({ msg: 'Usuário já autenticado!' })
})
