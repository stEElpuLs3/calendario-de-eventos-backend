import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap

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
    console.log('Dados enviados para registro:', formData); // Adicionando log para verificar os dados enviados
    axios.post('http://localhost:3000/api/users/register', formData) // Certifique-se de que a URL está correta
      .then(response => {
        console.log('Resposta do servidor:', response.data); // Adicionando log para verificar a resposta do servidor
        setMessage('Usuário registrado com sucesso!');
        axios.post('http://localhost:3000/api/users/login', formData) // Certifique-se de que a URL está correta
          .then(response => {
            console.log('Resposta do servidor (login):', response.data); // Adicionando log para verificar a resposta do servidor
            localStorage.setItem('token', response.data.token);
            setMessage('Login realizado com sucesso!');
            navigate('/'); // Redirecionar o usuário para a página principal
          })
          .catch(error => {
            console.error('Erro ao fazer login:', error.message); // Adicionando log para verificar o erro
            setMessage('Erro ao fazer login: ' + error.message);
          });
      })
      .catch(error => {
        console.error('Erro ao registrar usuário:', error.message); // Adicionando log para verificar o erro
        setMessage('Erro ao registrar usuário: ' + error.message);
      });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha:</label>
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Register;