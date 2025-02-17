// controllers/eventController.js
const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
  const { nome, descricao, data_inicio, data_fim, local } = req.body;

  try {
    const newEvent = new Event({ nome, descricao, data_inicio, data_fim, local });
    await newEvent.save();
    res.status(201).json({ msg: 'Evento criado com sucesso!', evento: newEvent });
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};

const updateEvent = async (req, res) => {
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
};

// Exportando as funções
module.exports = {
  createEvent,
  updateEvent
};
