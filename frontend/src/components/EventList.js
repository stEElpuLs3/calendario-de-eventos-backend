import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
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
    <div>
      <h2>Lista de Eventos</h2>
      <ul>
        {eventos.map(evento => (
          <li key={evento._id}>
            <strong>{evento.nome}</strong> - {evento.data_inicio} a {evento.data_fim}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
