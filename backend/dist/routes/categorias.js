"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerCategorias = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const dbValidators_1 = require("../helpers/dbValidators");
const categoriasController_1 = require("../controllers/categoriasController");
const validarCampos_1 = require("../middlewares/validarCampos");
exports.routerCategorias = (0, express_1.Router)();
//  Obtener todas las categorias - público
exports.routerCategorias.get('/', categoriasController_1.getCategorias);
// Obtener una categoria por id - público
exports.routerCategorias.get('/:id', [(0, express_validator_1.check)('id', 'No es un id de Mongo válido').isMongoId(), (0, express_validator_1.check)('id').custom(dbValidators_1.existeCategoriaPorId), validarCampos_1.validarCampos], categoriasController_1.getCategoria);
// Crear categoria - privado - cualquier persona con un token válido
exports.routerCategorias.post('/', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos_1.validarCampos], categoriasController_1.insertCategoria);
// Actualizar - privado - cualquiera con token válido
exports.routerCategorias.put('/:id', [
    //    validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeCategoriaPorId),
    validarCampos_1.validarCampos
], categoriasController_1.updateCategoria);
// Borrar una categoria - Admin
exports.routerCategorias.delete('/:id', [
    //    validarJWT,
    //    esAdminRol,
    (0, express_validator_1.check)('id', 'No es un id de Mongo válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeCategoriaPorId),
    validarCampos_1.validarCampos
], categoriasController_1.deleteCategoria);
//# sourceMappingURL=categorias.js.map