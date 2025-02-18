const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const { createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');


router.post('/create', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

router.get('/list', async (req, res) => {
  try {
    const eventos = await Event.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar eventos', erro: error.message });
  }
});

module.exports = router;
