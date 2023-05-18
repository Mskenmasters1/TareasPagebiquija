"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsuarios = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const dbValidators_1 = require("../helpers/dbValidators");
const validarCampos_1 = require("../middlewares/validarCampos");
const usuariosController_1 = require("../controllers/usuariosController");
const validarJwt_1 = require("../middlewares/validarJwt");
const validarRoles_1 = require("../middlewares/validarRoles");
exports.routerUsuarios = (0, express_1.Router)();
// check va almacenando los errores para que el validationResult concluya el proceso de revisión. Este validationResult lo tenemos en validarCampos
// Si hay errores, validarCampos devolverá un error. Si no los hay, ejecutará el resto del controller (insertUsuario o updateUsuario)
// En las peticiones, incluimos el middleware para comprobar el acceso de personas autenticadas
exports.routerUsuarios.get('/', [validarJwt_1.validarJWT], usuariosController_1.getUsuarios);
exports.routerUsuarios.post('/', [
    validarJwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El email no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(dbValidators_1.emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    (0, express_validator_1.check)('rol').custom(dbValidators_1.esRolValido),
    validarCampos_1.validarCampos
], usuariosController_1.insertUsuario);
exports.routerUsuarios.put('/:id', [
    validarJwt_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeUsuarioPorId),
    (0, express_validator_1.check)('rol').custom(dbValidators_1.esRolValido),
    validarCampos_1.validarCampos
], usuariosController_1.updateUsuario);
exports.routerUsuarios.delete('/:id', [
    validarJwt_1.validarJWT,
    validarRoles_1.esAdminRol,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeUsuarioPorId),
    validarCampos_1.validarCampos
], usuariosController_1.deleteUsuario);
//# sourceMappingURL=usuarios.js.map