
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
      // Verifica se o evento existe antes de atualizar
      const event = await Event.findById(id);
      console.log("Evento encontrado:", event);

      if (!event) {
          return res.status(404).json({ msg: 'Evento não encontrado' });
      }

      // Atualizar o evento
      const updatedEvent = await Event.findByIdAndUpdate(id, {
          nome,
          descricao,
          data_inicio,
          data_fim,
          local
      }, { new: true });

      res.status(200).json({ msg: 'Evento atualizado com sucesso!', evento: updatedEvent });

  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Erro ao atualizar evento', erro: err.message });
  }
};
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedEvent = await Event.findByIdAndDelete(id);

      if (!deletedEvent) {
          return res.status(404).json({ msg: 'Evento não encontrado' });
      }

      res.status(200).json({ msg: 'Evento deletado com sucesso!', evento: deletedEvent });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Erro ao deletar evento', erro: err.message });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent
};
