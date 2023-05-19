import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './database/config';
import { routerUsuarios } from './routes/usuarios';
import { routerAuth } from './routes/auth';
import { routerTareas } from './routes/tareas';

dotenv.config();

export const server: Express = express();

// Middlewares
server.use(express.static('public'));
server.use(cors());
server.use(express.json());
// Routas
server.use('/api/auth', routerAuth);
server.use('/api/usuarios', routerUsuarios);
server.use('/api/tareas', routerTareas);

// Base de datos
dbConnection();

server.listen(process.env.PORT, () => {
  console.log('Servidor en ejecución en puerto ' + process.env.PORT);
});
