import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS
app.use(cors({
  origin: 'https://www.iftalentos.page', 
  methods: ['GET', 'POST']
}));

// Configuração de proxy
app.set("trust proxy", 1);

// Body Parser para JSON
app.use(express.json());

// Prefixo /api para todas as rotas
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`🚀 Microserviço rodando na porta ${PORT}`);
});