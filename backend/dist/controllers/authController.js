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
exports.refreshToken = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = require("../models/usuario");
const generarJwt_1 = require("../helpers/generarJwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificamos si el email existe
        const usuario = yield usuario_1.Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }
        // Verificamos si el usuario está activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        // Verificamos la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        // Generamos el JWT
        const token = yield (0, generarJwt_1.generarJWT)(usuario.id);
        res.status(200).json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Se ha producido un error'
        });
    }
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    const { id } = jsonwebtoken_1.default.verify(token, process.env.SECRETPRIVATEKEY || '');
    const newToken = yield (0, generarJwt_1.generarJWT)(id);
    res.status(200).json({
        newToken
    });
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=authController.js.map