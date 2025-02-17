console.log("Iniciando o servidor..."); // Exibe uma mensagem ao iniciar

require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const app = express();
const port = 5000;
const conectarDB = require('./config/db'); // Função para conectar ao MongoDB
const cors = require('cors');

// Configurações do servidor
app.use(cors()); 
app.use(express.json()); // Permite o envio de JSON no corpo das requisições
// Habilita o CORS para permitir requisições de outros domínios

// Conectar ao banco de dados MongoDB
conectarDB(); // Chama a função de conexão com o MongoDB

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;

// Definir as rotas de usuário e evento
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes'); // Removi a declaração duplicada

// Usar as rotas no servidor
app.use('/api/users', userRoutes); // Rota de usuários
app.use('/api', eventRoutes); // Rota de eventos

const events = [
  { id: 1, title: "Evento 1", date: "2025-02-20" },
  { id: 2, title: "Evento 2", date: "2025-02-21" }
];

// Configurar CORS para permitir que o frontend se conecte
app.use(cors()); // Isso permite que o seu frontend, na porta 3000 por exemplo, faça requisições ao backend

// Rota para obter eventos
app.get('/api/events', (req, res) => {
  res.json(events); // Retorna os eventos em formato JSON
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Mensagem ao iniciar o servidor
});
