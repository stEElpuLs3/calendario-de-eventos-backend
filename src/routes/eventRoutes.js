const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const { createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');


router.post('/events', createEvent);

router.put('/events/:id', updateEvent);

router.delete('/events/:id', deleteEvent);

router.get('/list', async (req, res) => {
  try {
    const eventos = await Event.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar eventos', erro: error.message });
  }
});

module.exports = router;
