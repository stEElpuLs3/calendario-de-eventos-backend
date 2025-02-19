import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CreateEvent from './components/CreateEvent'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalendarPage from './pages/CalendarPage';
import CalendarView from './components/CalendarView';
import Register from './components/Register';
import Login from './components/Login';


const App = () => {
  const [events, setEvents] = useState([]);

  
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/events'); 
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/" element={<CalendarView />} />
      </Routes>
    </Router>
      
    </div>
  );
};

export default App;