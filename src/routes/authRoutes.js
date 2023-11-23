
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const telefones = req.body.telefones
  
    if (!name) {
      return res.status(422).json({ msg: 'O nome é obrigatório!' })
    }
    if (!email) {
      return res.status(422).json({ msg: 'O email é obrigatório!' })
    }
    if (!password) {
      return res.status(422).json({ msg: 'A senha é obrigatória!' })
    }
    if (confirmPassword != password) {
      return res.status(422).json({ msg: 'As senhas não conferem!' })
    }
    if (!telefones) {
      return res
        .status(422)
        .json({ msg: 'O telefone é obrigatório respeitando os parâmetros!' })
    }
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      return res.status(422).json({
        msg: 'Já existe uma conta com esse email! Utilize um outro e-mail.',
      })
    }
  
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
  
    const currentDate = new Date()
  
    const user = new User({
      name,
      email,
      password: passwordHash,
      telefones,
      data_criacao: currentDate,
      data_atualizacao: currentDate,
      ultimo_login: null,
    })
  
    try {
      await user.save()
  
      const secret = process.env.JWT_SECRET
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        { expiresIn: '30m' },
      )
  
      user.ultimo_login = currentDate
      await user.save()
  
      res.status(201).json({
        msg: 'Usuário criado com sucesso!',
        id: user._id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
        token,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Aconteceu um erro inesperado. Tente novamente mais tarde!',
      })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
  
    if (!email) {
      return res.status(422).json({ msg: 'O email é obrigatório!' })
    }
    if (!password) {
      return res.status(422).json({ msg: 'A senha é obrigatória!' })
    }
  
    const user = await User.findOne({ email })
  
    if (!user) {
      return res.status(404).json({ msg: 'Usuário e/ou senha inválidos' })
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password)
  
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Usuário e/ou senha inválidos' })
    }
  
    try {
      const secret = process.env.JWT_SECRET
  
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,{ expiresIn: '30m' }
      )

      res.status(200).json({
        msg: 'Autenticação realizada com sucesso!',
        id: user._id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
        token,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: 'Aconteceu um erro inesperado. Tente novamente mais tarde!',
      })
    }
})

module.exports = router;