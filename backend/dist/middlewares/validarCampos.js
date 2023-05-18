"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
// Aquí llega la recopilación de errores de todos los middlewares check de las rutas. Si hay errores, arrojamos un error 400
// Si no hay errores seguimos adelante mediante next
const validarCampos = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next(); // Si no hay errores sigue hacia adelante al siguiente Middleware. Si no hay, continua con el controlador
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validarCampos.js.map