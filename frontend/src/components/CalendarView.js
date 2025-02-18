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

  return (
    <div className="calendar-page">
      <div className="calendar-view">
        <Calendar onChange={setDate} value={date} 
        />
        
      </div>
      <ul>
        <h1>Eventos</h1>
        {eventos
          .filter(evento => new Date(evento.data_inicio).toDateString() === date.toDateString())
          .map(evento => (
            <li key={evento._id}>{evento.nome}</li>
          ))}
      </ul>
    </div>
  );
};

export default CalendarView;
