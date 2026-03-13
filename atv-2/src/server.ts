import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import path from 'path';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Servindo o frontend
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da API
app.use('/api', routes);

// Conexão com o MongoDB
const PORT = 3000;
const DB_URL = 'mongodb://127.0.0.1:27017/shopping-list';

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Conectado ao MongoDB Compass com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));