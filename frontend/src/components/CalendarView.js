import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [eventoAtual, setEventoAtual] = useState(null);

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
    // Aqui você pode abrir um formulário de edição com os dados do evento
    setEventoAtual(evento);
    alert(`Editar evento: ${evento.nome}`);  // Aqui só mostramos um alerta, você pode substituir por um modal ou um formulário.
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
          <h3>Evento Selecionado para Edição</h3>
          <p>Nome: {eventoAtual.nome}</p>
          <p>Local: {eventoAtual.local}</p>
          <p>Descrição: {eventoAtual.descricao}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
