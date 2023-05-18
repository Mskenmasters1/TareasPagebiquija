"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUploads = void 0;
const express_1 = require("express");
const validarArchivo_1 = require("../middlewares/validarArchivo");
const uploadsController_1 = require("../controllers/uploadsController");
const express_validator_1 = require("express-validator");
const dbValidators_1 = require("../helpers/dbValidators");
const validarCampos_1 = require("../middlewares/validarCampos");
exports.routerUploads = (0, express_1.Router)();
exports.routerUploads.put('/:coleccion/:id', [
    validarArchivo_1.validarArchivoSubir,
    (0, express_validator_1.check)('id', 'El id debe de ser de mongo').isMongoId(),
    (0, express_validator_1.check)('coleccion').custom((x) => (0, dbValidators_1.coleccionesPermitidas)(x, ['usuarios', 'productos'])),
    validarCampos_1.validarCampos
], uploadsController_1.actualizarImagen);
exports.routerUploads.get('/:coleccion/:id', [
    (0, express_validator_1.check)('id', 'El id debe de ser de mongo').isMongoId(),
    (0, express_validator_1.check)('coleccion').custom((x) => (0, dbValidators_1.coleccionesPermitidas)(x, ['usuarios', 'productos'])),
    validarCampos_1.validarCampos
], uploadsController_1.mostrarImagen);
//# sourceMappingURL=uploads.js.map