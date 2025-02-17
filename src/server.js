console.log("Iniciando o servidor..."); // Exibe uma mensagem ao iniciar

require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const app = express();
const conectarDB = require('./config/db'); // Função para conectar ao MongoDB
const cors = require('cors'); // Para permitir requisições de outros domínios

// Configurações do servidor
app.use(express.json()); // Permite o envio de JSON no corpo das requisições
app.use(cors()); // Habilita o CORS para permitir requisições de outros domínios

// Conectar ao banco de dados MongoDB
conectarDB(); // Chama a função de conexão com o MongoDB

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;

// Definir as rotas de usuário e evento
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes'); // Removi a declaração duplicada

// Usar as rotas no servidor
app.use('/api/users', userRoutes); // Rota de usuários
app.use('/api/events', eventRoutes); // Rota de eventos

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Mensagem ao iniciar o servidor
});
