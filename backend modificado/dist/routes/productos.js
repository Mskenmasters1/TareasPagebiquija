"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProductos = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const dbValidators_1 = require("../helpers/dbValidators");
const productosController_1 = require("../controllers/productosController");
const validarJwt_1 = require("../middlewares/validarJwt");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarRoles_1 = require("../middlewares/validarRoles");
exports.routerProductos = (0, express_1.Router)();
//  Obtener todas los productos - público
exports.routerProductos.get('/', productosController_1.getProductos);
// Obtener un producto por id - público
exports.routerProductos.get('/:id', [(0, express_validator_1.check)('id', 'No es un id de Mongo válido').isMongoId(), (0, express_validator_1.check)('id').custom(dbValidators_1.existeProductoPorId), validarCampos_1.validarCampos], productosController_1.getProducto);
// Crear producto - privado - cualquier persona con un token válido
exports.routerProductos.post('/', [
    validarJwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('categoria', 'No es un id de Mongo').isMongoId(),
    (0, express_validator_1.check)('categoria').custom(dbValidators_1.existeCategoriaPorId),
    validarCampos_1.validarCampos
], productosController_1.insertProducto);
// Actualizar - privado - cualquiera con token válido
exports.routerProductos.put('/:id', [
    validarJwt_1.validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeProductoPorId),
    validarCampos_1.validarCampos
], productosController_1.updateProducto);
// Borrar un producto - Admin
exports.routerProductos.delete('/:id', [
    validarJwt_1.validarJWT,
    validarRoles_1.esAdminRol,
    (0, express_validator_1.check)('id', 'No es un id de Mongo válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeProductoPorId),
    validarCampos_1.validarCampos
], productosController_1.deleteProducto);
//# sourceMappingURL=productos.js.map