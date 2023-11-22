const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
    telefones: [{
        numero: Number,
        ddd: Number
    }],
    data_criacao: {
        type: Date,
        default: Date.now
      },
      data_atualizacao: {
        type: Date,
        default: Date.now
      },
      ultimo_login: {
        type: Date,
        default: null
      }
})

const User = mongoose.model('User', userSchema);

module.exports = User
