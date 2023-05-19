import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/config';
import { routerUsuarios } from './routes/usuarios';
import { routerAuth } from './routes/auth';
import { routerUsuarios } from './routes/tareas';
import { routerProductos } from './routes/productos';
import { routerUploads } from './routes/uploads';

dotenv.config();

export const server: Express = express();

// Middlewares
server.use(express.static('public'));
server.use(cors());
server.use(express.json());
server.use(
  fileUpload({
    createParentPath: true // Para que cree la carpeta si no existe
  })
);

// Rutas
server.use('/api/auth', routerAuth);
server.use('/api/usuarios', routerUsuarios);
server.use('/api/categorias', routerUsuarios);
server.use('/api/productos', routerProductos);
server.use('/api/uploads', routerUploads);

// Base de datos
dbConnection();

server.listen(process.env.PORT, () => {
  console.log('Servidor en ejecución en puerto ' + process.env.PORT);
});
