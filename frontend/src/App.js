
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from './components/CreateEvent'; // Certifique-se de que o caminho está correto


const App = () => {
  const [events, setEvents] = useState([]);

  // Função para pegar eventos do backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events'); // URL do seu backend
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };



  // Chama a função quando o componente for montado
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <h1>Calendário de Eventos</h1>
     
      <CreateEvent />
    </div>
  );
};

export default App;