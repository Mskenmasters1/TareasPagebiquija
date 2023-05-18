"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdminRol = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = require("../models/usuario");
const esAdminRol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.SECRETPRIVATEKEY || '');
        // Leemos el usuario que corresponde al id
        const usuario = yield usuario_1.Usuario.findById(id);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario inexistente'
            });
        }
        // Verificamos si el id tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }
        const { rol, nombre } = usuario;
        // Verificamos si es administrador
        if (rol !== 'ADMIN_ROLE') {
            return res.status(401).json({
                msg: `${nombre} no es administrador - No puede hacer esto`
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
});
exports.esAdminRol = esAdminRol;
//# sourceMappingURL=validarRoles.js.map