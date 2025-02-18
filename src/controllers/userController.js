const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  console.log('Dados recebidos para registro:', req.body); // Adicionando log para verificar os dados recebidos

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const user = new User({
      nome,
      email,
      senha
    });

    await user.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  console.log('Dados recebidos para login:', req.body); // Adicionando log para verificar os dados recebidos

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, user: { id: user._id, nome: user.nome, email: user.email } });
  } catch (err) {
    console.error('Erro ao fazer login:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

module.exports = {
  registerUser,
  loginUser
};