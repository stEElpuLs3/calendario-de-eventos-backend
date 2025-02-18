import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [eventoAtual, setEventoAtual] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    local: '',
    descricao: '',
    data_inicio: '',
    data_fim: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/events/list')
      .then(response => {
        setEventos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar eventos:", error);
      });
  }, []);

  // Filtra os eventos para o dia selecionado
  const eventosNoDia = eventos.filter(evento => {
    const dataEvento = new Date(evento.data_inicio);
    return dataEvento.toDateString() === date.toDateString();
  });

  // Função para deletar evento
  const handleDeletar = (id) => {
    axios.delete(`http://localhost:5000/api/events/delete/${id}`)
      .then(response => {
        setEventos(eventos.filter(evento => evento._id !== id));
      })
      .catch(error => {
        console.error("Erro ao deletar evento:", error);
      });
  };

  // Função para editar evento
  const handleEditar = (evento) => {
    // Aqui você preenche o formulário com os dados do evento
    setEventoAtual(evento);
    setFormData({
      nome: evento.nome,
      local: evento.local,
      descricao: evento.descricao,
      data_inicio: evento.data_inicio,
      data_fim: evento.data_fim
    });
  };

  // Função para enviar o formulário de edição
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvento = {
      ...formData
    };

    axios.put(`http://localhost:5000/api/events/edit/${eventoAtual._id}`, updatedEvento)
      .then(response => {
        setEventos(eventos.map(evento =>
          evento._id === eventoAtual._id ? response.data : evento
        ));
        setEventoAtual(null); // Limpar o evento atual
        setFormData({
          nome: '',
          local: '',
          descricao: '',
          data_inicio: '',
          data_fim: ''
        });
      })
      .catch(error => {
        console.error("Erro ao editar evento:", error);
      });
  };

  return (
    <div className="calendar-page">
      <div className="calendar-view">
        <Calendar 
          onChange={setDate} 
          value={date} 
          tileClassName={({ date, view }) => {
            // Destacar os dias que têm eventos
            const eventosDoDia = eventos.some(evento => {
              const dataEvento = new Date(evento.data_inicio);
              return dataEvento.toDateString() === date.toDateString();
            });
            return eventosDoDia ? 'event-day' : null;
          }}
        />
      </div>

      <h2>Eventos do dia {date.toLocaleDateString()}</h2>
      <ul>
        {eventosNoDia.length > 0 ? (
          eventosNoDia.map(evento => (
            <li key={evento._id}>
              <strong>{evento.nome}</strong> <br />
              📍 {evento.local} <br />
              📝 {evento.descricao} <br />
              <button onClick={() => handleEditar(evento)}>Editar</button>
              <button onClick={() => handleDeletar(evento._id)}>Deletar</button>
            </li>
          ))
        ) : (
          <li>Não há eventos para este dia.</li>
        )}
      </ul>

      {eventoAtual && (
        <div>
          <h3>Editar Evento</h3>
          <form onSubmit={handleSubmit}>
            <label>Nome:</label>
            <input
              type="text"
              value={formData.nome}
              onChange={e => setFormData({ ...formData, nome: e.target.value })}
            />
            <label>Local:</label>
            <input
              type="text"
              value={formData.local}
              onChange={e => setFormData({ ...formData, local: e.target.value })}
            />
            <label>Descrição:</label>
            <textarea
              value={formData.descricao}
              onChange={e => setFormData({ ...formData, descricao: e.target.value })}
            />
            <label>Data Início:</label>
            <input
              type="datetime-local"
              value={formData.data_inicio}
              onChange={e => setFormData({ ...formData, data_inicio: e.target.value })}
            />
            <label>Data Fim:</label>
            <input
              type="datetime-local"
              value={formData.data_fim}
              onChange={e => setFormData({ ...formData, data_fim: e.target.value })}
            />
            <button type="submit">Salvar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
