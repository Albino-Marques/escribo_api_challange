const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    telefones: [{
        numero: Number,
        ddd: Number
    }]
})

module.exports = User