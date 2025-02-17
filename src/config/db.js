const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://vitorvrp7:DXzfgVUdpn4XPckq@calendario.de3ok.mongodb.net/?retryWrites=true&w=majority&appName=calendario');
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
