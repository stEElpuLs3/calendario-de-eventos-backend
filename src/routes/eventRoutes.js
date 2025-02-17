const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const { createEvent, updateEvent } = require('../controllers/eventController');

// Rota para atualizar um evento
router.put('/events/:id', updateEvent);
router.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, data_inicio, data_fim, local } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, {
      nome,
      descricao,
      data_inicio,
      data_fim,
      local
    }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ msg: 'Evento não encontrado' });
    }

    res.status(200).json({ msg: 'Evento atualizado com sucesso!', evento: updatedEvent });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao atualizar evento', erro: err.message });
  }
});

// Rota para criar um novo evento
router.post('/events', createEvent);
router.post('/create', async (req, res) => {
  const { nome, descricao, data_inicio, data_fim, local } = req.body;

  try {
    // Criar o evento
    const newEvent = new Event({
      nome,
      descricao,
      data_inicio,
      data_fim,
      local
    });

    // Salvar o evento no banco de dados
    await newEvent.save();

    // Resposta de sucesso
    res.status(201).json({ msg: 'Evento criado com sucesso!', evento: newEvent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para listar todos os eventos
router.get('/list', async (req, res) => {
  try {
    const eventos = await Event.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar eventos', erro: error.message });
  }
});

module.exports = router;


// Rota para listar todos os eventos
router.get('/list', async (req, res) => {
  try {
    const eventos = await Event.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar eventos', erro: error.message });
  }
});

module.exports = router;
