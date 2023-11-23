require('dotenv').config()
const express = require('express')
const checkToken = require('./src/middlewares/checkToken')
const connectDB = require('./src/config/db')
const authRoutes = require('./src/routes/authRoutes')

const app = express()

app.use(express.json())

connectDB().then(() => {
  app.listen(3000)
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







// const dbUser = process.env.DB_USER
// const dbPassword = process.env.DB_PASS

// mongoose
//   .connect(
//     `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ypjpopk.mongodb.net/?retryWrites=true&w=majority`,
//   )
//   .then(() => {
//     app.listen(3000)
//     console.log('Conectou ao banco')
//   })
//   .catch((err) => {
//     console.log(err)
//   })
