require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

const User = require('./models/User')

app.get('/', (req,res) => {
    res.status(200).json({msg: "Bem vindo a API"})
})

app.post('/auth/signup', async (req,res) => {
      const {name, email, password, confirmPassword} = req.body
      const telefones = req.body.telefones

      if(!name){
        return res.status(422).json({msg: "O nome é obrigatório!"})
      }
      if(!email){
        return res.status(422).json({msg: "O email é obrigatório!"})
      }
      if(!password){
        return res.status(422).json({msg: "A senha é obrigatória!"})
      }
      if(confirmPassword != password){
        return res.status(422).json({msg: "As senhas não conferem!"})
      }
      if(!telefones){
        return res.status(422).json({msg: "O telefone é obrigatório!"})
      }
      

    const userExists = await User.findOne({email:email})

    if(userExists){
        return res.status(422).json({msg: "Já existe uma conta com esse email! Utilize um outro e-mail."})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email, 
        password:passwordHash,
        telefones
    })

    try{
        await user.save()
        
        res.status(201).json({msg: "Usuário criado com sucesso!"})
    }catch(error){
        console.log(error)
        res.status(500).json({msg: "Aconteceu um erro inesperado. Tente novamente mais tarde!"})
    }
})


const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ypjpopk.mongodb.net/?retryWrites=true&w=majority`).then(() =>{
    app.listen(3000)
    console.log("Conectou ao banco")
}).catch((err)=> {
    console.log(err)
})



