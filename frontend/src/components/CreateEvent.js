// src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  // Definir os estados para os campos
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data_inicio, setDataInicio] = useState('');
  const [data_fim, setDataFim] = useState('');
  const [local, setLocal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    console.log('Dados do evento:', {
        nome,
        descricao,
        data_inicio,
        data_fim,
        local,
      });
      
    try {
      const response = await axios.post('http://localhost:5000/api/events', {
        nome,
        descricao,
        data_inicio,
        data_fim,
        local,
      });

      alert(response.data.msg);
      // Limpar campos após envio
      setNome('');
      setDescricao('');
      setDataInicio('');
      setDataFim('');
      setLocal('');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar evento');
    }
  };

  return (
    <div>
      <h2>Criar Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="data_inicio">Data Início</label>
          <input
            type="date"
            id="data_inicio"
            value={data_inicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="data_fim">Data Fim</label>
          <input
            type="date"
            id="data_fim"
            value={data_fim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="local">Local</label>
          <input
            type="text"
            id="local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </div>

        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;
