import { Router } from 'express';
import { check } from 'express-validator';
import { existeTareaPorId, existeUsuarioPorId } from '../helpers/dbValidators';
import {
  deleteTarea,
  getTareas,
  getTareasByUsuario,
  insertTarea,
  updateTarea
} from '../controllers/tareasController';
import { validarJWT } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';

export const routerTareas = Router();

//  Obtener todas las tareas -
routerTareas.get('/', getTareas);

// Obtener tareas por usuario
routerTareas.get('/:idUsuario',
  [check('id', 'No es un id de Mongo válido').isMongoId(), check('id').custom(existeTareaPorId), validarCampos],
  getTareasByUsuario
);

// Crear tarea
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

// Actualizar tarea
routerTareas.put(
  '/:id',
  [
    validarJWT,
    check('usuario','No es un id de Mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ],
  updateTarea
);

// Borrar una tarea
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
