const mongoose = require('mongoose');

// Definir o schema do evento
const eventSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  data_inicio: {
    type: Date,
    required: true
  },
  data_fim: {
    type: Date,
    required: true
  },
  local: {
    type: String,
    required: true
  },
  criado_em: {
    type: Date,
    default: Date.now
  }
});

// Criar o modelo de Evento com base no schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
