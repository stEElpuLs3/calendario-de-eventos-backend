const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { registerUser, loginUser } = require('../controllers/userController');

// Rota para cadastro de usuário
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criar um novo usuário
    user = new User({
      nome,
      email,
      senha
    });

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(senha, salt);

    // Salvar o usuário no banco de dados
    await user.save();

    // Retornar um sucesso
    res.status(201).json({ msg: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    // Comparar a senha informada com a criptografada
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    // Gerar um token JWT
    const payload = {
      userId: user._id
    };

    const token = jwt.sign(payload, 'secreta_chave', { expiresIn: '1h' });

    // Retornar o token JWT
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
