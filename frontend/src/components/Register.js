import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/register', formData)
      .then(response => {
        setMessage('Usuário registrado com sucesso!');
        axios.post('http://localhost:5000/api/users/login', formData)
          .then(response => {
            localStorage.setItem('token', response.data.token);
            setMessage('Login realizado com sucesso!');
            navigate('/'); // Redirecionar o usuário para a página principal
          })
          .catch(error => {
            setMessage('Erro ao fazer login: ' + error.message);
          });
      })
      .catch(error => {
        setMessage('Erro ao registrar usuário: ' + error.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <label>Senha:</label>
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;