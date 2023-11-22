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

app.get('/user/:id', checkToken ,async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id, '-password')

  if(!user){
    return res.status(404).json({msg: "Usuário não encontrado!"})
  }

  user.atualizarUltimoLogin()
  try {
      res.status(200).json({user})
  }catch (error){
    res.status(400)
  }



})

function checkToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(!token){
    return res.status(401).json({msg: "Acesso negado!"})
  }

  try{
    const secret = process.env.JWT_SECRET

    jwt.verify(token, secret)

    next()
  }catch(error){
    res.status(400).json({msg: "O Token é inválido!"})
  }

}

app.post('/auth/signup',async (req,res) => {
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
        return res.status(422).json({msg: "O telefone é obrigatório respeitando os parâmetros!"})
      }
      

    const userExists = await User.findOne({email:email})

    if(userExists){
        return res.status(422).json({msg: "Já existe uma conta com esse email! Utilize um outro e-mail."})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const currentDate = new Date();

    const user = new User({
      name,
      email,
      password: passwordHash,
      telefones,
      data_criacao: currentDate,
      data_atualizacao: currentDate,
      ultimo_login: null  
    });


    try {
      await user.save();
  

      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({
        id: user._id
      }, secret);
      
    user.ultimo_login = currentDate;
    await user.save();

      res.status(201).json({
        msg: "Usuário criado com sucesso!",
        id: user._id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Aconteceu um erro inesperado. Tente novamente mais tarde!" });
    }
})


app.post("/auth/login", async (req, res)=>{
  const {email, password} = req.body

  if(!email){
    return res.status(422).json({msg: "O email é obrigatório!"})
  }
  if(!password){
    return res.status(422).json({msg: "A senha é obrigatória!"})
  }

  const user = await User.findOne({email:email})

  if(!user){
    return res.status(404).json({msg: "Usuário não encontrado!"})
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(422).json({msg: "Senha incorreta!"})
  }

  try{
    const secret = process.env.JWT_SECRET

    const token = jwt.sign({
        id: user._id
    }, secret)
    
    res.status(200).json({msg: "Autenticação realizada com sucesso!", token})
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



