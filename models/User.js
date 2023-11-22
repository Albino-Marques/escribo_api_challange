const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
};


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    telefones: [
        {
            numero: Number,
            ddd: Number,
        },
    ],
    data_criacao: {
        type: String,
        // default: Date.now,
    },
    data_atualizacao: {
        type: String,
        // default: Date.now,
    },
    ultimo_login: {
        type: String,
        // default: null,
    },
});


userSchema.methods.atualizarUltimoLogin = function () {
    this.ultimo_login = new Date();
    return this.save();
};


userSchema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.data_criacao = formatDate(ret.data_criacao);
        ret.data_atualizacao = formatDate(ret.data_atualizacao);
        ret.ultimo_login = ret.ultimo_login ? formatDate(ret.ultimo_login) : null;
        return ret;
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
