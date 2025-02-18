const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const { createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');


router.post('/create', async (req, res) => {
  try {
    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!req.body.nome || !req.body.data_inicio || !req.body.data_fim || !req.body.local || !req.body.descricao) {
      return res.status(400).json({ msg: "Preencha todos os campos obrigatórios: nome, data_inicio, data_fim, local e descricao." });
    }

    // Convertendo as datas e ajustando o fuso horário
    const dataInicio = new Date(req.body.data_inicio);
    const dataFim = new Date(req.body.data_fim);

    if (isNaN(dataInicio) || isNaN(dataFim)) {
      return res.status(400).json({ msg: "Formato de data inválido." });
    }

    dataInicio.setUTCHours(12, 0, 0, 0);
    dataFim.setUTCHours(12, 0, 0, 0);

    // Criando o evento
    const novoEvento = new Event({
      nome: req.body.nome,
      data_inicio: dataInicio,
      data_fim: dataFim,
      local: req.body.local,  // Agora incluímos "local"
      descricao: req.body.descricao // E "descricao"
    });

    await novoEvento.save();
    res.status(201).json({ msg: "Evento criado com sucesso!", evento: novoEvento });

  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar evento", erro: error.message });
  }
});

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
