const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) {
      return res.status(403).json({ msg: 'Acesso negado!' })
    }
  
    try {
      const secret = process.env.JWT_SECRET
      const decoded = jwt.verify(token, secret)
      const agoraEmSegundos = Math.floor(Date.now() / 1000)
  
      if (decoded.exp <= agoraEmSegundos) {
        return res.status(401).json({ msg: 'Token expirado' })
      }
  
      next()
    } catch (error) {
      res.status(401).json({ msg: 'Não autorizado' })
    }
  }

  module.exports = checkToken;