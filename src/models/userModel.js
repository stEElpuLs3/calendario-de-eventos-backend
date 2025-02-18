const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um email válido.']
  },
  senha: {
    type: String,
    required: true
  },
}, {
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
