import { Router } from 'express';
import { check } from 'express-validator';
import { existeTareaPorId } from '../helpers/dbValidators';
import {
  deleteTarea,
  getTareas,
  insertTarea,
  updateTarea
} from '../controllers/tareasController';
import { validarJWT } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';

export const routerTareas = Router();

//  Obtener todas las tareas - público
routerTareas.get('/', getTareas);

// Obtener una tarea por id - público
routerTareas.get(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), check('id').custom(existeTareaPorId), validarCampos],
  getTarea
);

// Crear tarea - privado - cualquier persona con un token válido
routerTareas.post(
  '/',
  [
    validarJWT,
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('usuario', 'No es un id de Mongo').isMongoId(),
    check('usuario').custom(existeUsuarioPorId),
    validarCampos
  ],
  insertTarea
);

// Actualizar - privado - cualquiera con token válido
routerTareas.put(
  '/:id',
  [
    validarJWT,
    // check('usuario','No es un id de Mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ],
  updateTarea
);

// Borrar una tarea - Admin
routerTareas.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeTareaPorId),
    validarCampos
  ],
  deleteTarea
);
