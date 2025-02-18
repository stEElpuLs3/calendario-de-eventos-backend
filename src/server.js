console.log("Iniciando o servidor..."); 

require('dotenv').config(); 
const express = require('express');
const app = express();
const port = 5000;
const conectarDB = require('./config/db'); 
const cors = require('cors');

// Configurações do servidor
app.use(cors()); 
app.use(express.json()); // Permite o envio de JSON no corpo das requisições
conectarDB();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes'); 

app.use('/api/users', userRoutes); // Rota de usuários
app.use('/api/events', eventRoutes); // Rota de eventos

const events = [
  { id: 1, title: "Evento 1", date: "2025-02-20" },
  { id: 2, title: "Evento 2", date: "2025-02-21" }
];


app.use(cors()); 

// Rota para obter eventos
app.get('/api/events', (req, res) => {
  res.json(events); // Retorna os eventos em formato JSON
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Mensagem ao iniciar o servidor
});
