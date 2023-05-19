import { Router } from 'express';
import { check } from 'express-validator';
import { existeTareaPorId } from '../helpers/dbValidators';
import { validarJWT } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';
import { getUsuarios } from '../controllers/usuariosController';
import { deleteTarea, getTareas, insertTarea, updateTarea } from '../controllers/tareasController';

export const routerUsuarios = Router();

//  Obtener todos los usuarios - público
routerUsuarios.get('/', getUsuarios);

// Obtener las tareas por id - público
routerUsuarios.get(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), check('id').custom(existeTareaPorId), validarCampos],
  getTareas
);

// Crear tarea - privado - cualquier persona con un token válido
routerUsuarios.post(
  '/',
  [check('titulo', 'El titulo es obligatorio').not().isEmpty(), validarCampos],
  insertTarea
);

// Actualizar - privado - cualquiera con token válido
routerUsuarios.put(
  '/:id',
  [
    //    validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('id').custom(existeTareaPorId),
    validarCampos
  ],
  updateTarea
);

// Borrar una tarea 
routerUsuarios.delete(
  '/:id',
  [
    //    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeTareaPorId),
    validarCampos
  ],
  deleteTarea
);
