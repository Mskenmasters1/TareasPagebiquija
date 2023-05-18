"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const authController_1 = require("../controllers/authController");
const validarJwt_1 = require("../middlewares/validarJwt");
exports.routerAuth = (0, express_1.Router)();
exports.routerAuth.post('/login', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos_1.validarCampos
], authController_1.login);
exports.routerAuth.get('/refreshToken', validarJwt_1.validarJWT, authController_1.refreshToken);
//# sourceMappingURL=auth.js.map