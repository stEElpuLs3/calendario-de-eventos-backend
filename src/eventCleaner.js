const mongoose = require('mongoose');
const Event = require('./models/eventModel'); // Verifique o caminho correto do seu modelo

async function limparEventos() {
  try {
    await mongoose.connect('mongodb+srv://vitorvrp7:DXzfgVUdpn4XPckq@calendario.de3ok.mongodb.net/?retryWrites=true&w=majority&appName=calendario', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const resultado = await Event.deleteMany({}); // Apaga todos os eventos
    console.log(`${resultado.deletedCount} eventos foram removidos!`);

    mongoose.connection.close(); // Fecha a conexão com o banco
  } catch (error) {
    console.error("Erro ao apagar eventos:", error);
  }
}

limparEventos();
