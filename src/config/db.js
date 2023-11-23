// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASS;
    const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ypjpopk.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(connectionString);
    console.log('Conectou ao banco de dados');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
