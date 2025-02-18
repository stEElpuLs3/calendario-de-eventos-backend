
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from './components/CreateEvent'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalendarPage from './pages/CalendarPage';


const App = () => {
  const [events, setEvents] = useState([]);

  
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events'); 
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };



 
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
         <Router>
      <Navbar />
      <Routes>
        <Route path="/criar" element={<CreateEvent />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
      
    </div>
  );
};

export default App;