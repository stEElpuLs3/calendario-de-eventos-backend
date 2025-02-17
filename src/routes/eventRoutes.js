const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const { createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

// Rota para criar um novo evento (usa a função createEvent do controller)
router.post('/events', createEvent);

// Rota para atualizar um evento (usa a função updateEvent do controller)
router.put('/events/:id', updateEvent);

// Rota para deletar um evento (usa a função deleteEvent do controller)
router.delete('/events/:id', deleteEvent);

// Rota para listar todos os eventos (código inline)
router.get('/list', async (req, res) => {
  try {
    const eventos = await Event.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar eventos', erro: error.message });
  }
});

module.exports = router;
