console.log('--- Iniciando app.js ---');

import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'; 
import morgan from 'morgan'; 
import authRoutes from './routes/authRoutes.js';
import emotionEntryRoutes from './routes/emotionEntryRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import financiasRoutes from './routes/financiasRouter.js';
import sessaoRoutes from './routes/sessaoRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());
app.use('/auth', authRoutes);
app.use('/diario', emotionEntryRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/sessoes', sessaoRoutes);
app.use('/financias', financiasRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API de Psicologia está rodando!');
});

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

console.log('--- INICIANDO PROCESSO DE CONEXÃO ---');
console.log(`Porta definida: ${PORT}`);
console.log(`Tentando conectar com a URI: ${MONGO_URI ? 'URI encontrada' : 'URI NÃO ENCONTRADA!'}`);

if (!MONGO_URI) {
    console.error('ERRO FATAL: A variável de ambiente MONGO_URI não foi definida no arquivo .env.');
    process.exit(1); 
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('SUCESSO: MongoDB conectado! Iniciando o servidor Express...');
        
        app.listen(PORT, () => {
            console.log(`SERVIDOR NO AR: Rodando na porta ${PORT}`);
            console.log(`Acesse: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('FALHA NA CONEXÃO: Erro ao conectar ao MongoDB.', err.message);
        process.exit(1);
    });