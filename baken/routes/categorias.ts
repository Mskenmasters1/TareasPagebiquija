import { Router } from 'express';
import { check } from 'express-validator';

import { existeCategoriaPorId } from '../helpers/dbValidators';
import {
  getCategorias,
  getCategoria,
  insertCategoria,
  updateCategoria,
  deleteCategoria
} from '../controllers/categoriasController';
import { validarJWT } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';
import { esAdminRol } from '../middlewares/validarRoles';

export const routerCategorias = Router();

//  Obtener todas las categorias - público
routerCategorias.get('/', getCategorias);

// Obtener una categoria por id - público
routerCategorias.get(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), check('id').custom(existeCategoriaPorId), validarCampos],
  getCategoria
);

// Crear categoria - privado - cualquier persona con un token válido
routerCategorias.post(
  '/',
  [check('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos],
  insertCategoria
);

// Actualizar - privado - cualquiera con token válido
routerCategorias.put(
  '/:id',
  [
    //    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
  ],
  updateCategoria
);

// Borrar una categoria - Admin
routerCategorias.delete(
  '/:id',
  [
    //    validarJWT,
    //    esAdminRol,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
  ],
  deleteCategoria
);
