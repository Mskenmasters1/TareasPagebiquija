import { Router } from 'express';
import { check } from 'express-validator';
import { existeCategoriaPorId, existeProductoPorId } from '../helpers/dbValidators';
import {
  deleteProducto,
  getProducto,
  getProductos,
  insertProducto,
  updateProducto
} from '../controllers/productosController';
import { validarJWT } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';
import { esAdminRol } from '../middlewares/validarRoles';

export const routerProductos = Router();

//  Obtener todas los productos - público
routerProductos.get('/', getProductos);

// Obtener un producto por id - público
routerProductos.get(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), check('id').custom(existeProductoPorId), validarCampos],
  getProducto
);

// Crear producto - privado - cualquier persona con un token válido
routerProductos.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
  ],
  insertProducto
);

// Actualizar - privado - cualquiera con token válido
routerProductos.put(
  '/:id',
  [
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
  ],
  updateProducto
);

// Borrar un producto - Admin
routerProductos.delete(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
  ],
  deleteProducto
);
