import { Router } from 'express';
import { validarArchivoSubir } from '../middlewares/validarArchivo';
import { actualizarImagen, mostrarImagen } from '../controllers/uploadsController';
import { check } from 'express-validator';
import { coleccionesPermitidas } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';

export const routerUploads = Router();

routerUploads.put(
  '/:coleccion/:id',
  [
    validarArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom((x) => coleccionesPermitidas(x, ['usuarios', 'productos'])),
    validarCampos
  ],
  actualizarImagen
);

routerUploads.get(
  '/:coleccion/:id',
  [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom((x) => coleccionesPermitidas(x, ['usuarios', 'productos'])),
    validarCampos
  ],
  mostrarImagen
);
