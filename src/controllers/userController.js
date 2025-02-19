const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  console.log('Dados recebidos para registro:', req.body); // Adicionando log para verificar os dados recebidos

  try {
    console.log('Tentando verificar a existência do usuário...');
    const userExists = await User.findOne({ email });
    console.log('Verificação de existência de usuário:', userExists); // Adicionando log para verificar a existência do usuário

    if (userExists) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const user = new User({
      nome,
      email,
      senha
    });

    // Criptografar a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(senha, salt);
    console.log('Senha criptografada:', user.senha); // Adicionando log para verificar a senha criptografada

    await user.save();
    console.log('Usuário registrado com sucesso'); // Adicionando log para verificar o sucesso

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
    console.log('Usuário encontrado:', user); // Adicionando log para verificar o usuário encontrado

    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    console.log('Comparação de senha:', isMatch); // Adicionando log para verificar a comparação de senha

    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    console.log('Login realizado com sucesso'); // Adicionando log para verificar o sucesso

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