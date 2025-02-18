import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
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

  return (
    <div className="calendar-page">
      <div className="calendar-view">
        <Calendar 
          onChange={setDate} 
          value={date} 
          tileClassName={({ date, view }) => {
            // Destacar os dias que têm eventos
            const eventosDoDia = eventos.filter(evento => {
              const dataEvento = new Date(evento.data_inicio);
              return dataEvento.toDateString() === date.toDateString();
            });
            return eventosDoDia.length > 0 ? 'event-day' : null;
          }}
        />
      </div>
      <ul>
        {eventosNoDia.length > 0 ? (
          eventosNoDia.map(evento => (
            <li key={evento._id}>{evento.nome}</li>
          ))
        ) : (
          <li>Não há eventos para este dia.</li>
        )}
      </ul>
    </div>
  );
};

export default CalendarView;