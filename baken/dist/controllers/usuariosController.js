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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuario = exports.insertUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../models/usuario");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.Usuario.find({});
    res.status(200).json({
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const insertUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol } = req.body;
    const usuario = new usuario_1.Usuario({ nombre, email, password, rol });
    // Encriptar la contraseña (hash)
    // bcrypt nos pide que para encriptar agreguemos un salt
    // Un salt es un fragmento aleatorio que se usará para generar el hash asociado al password
    // Así evitamos que el hash sea el mismo para el mismo password. El valor que se genera es aleatorio y se guarda en la base de datos
    // getSaltSync permite elegir el "saltRounds", es decir, cuantas "vueltas" utiliza para generar el valor. Por defecto son 10 y es considerado un número equilibrado
    // entre el tiempo de generación y la seguridad
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    // Guardar en BD
    yield usuario.save();
    res.status(201).json({
        usuario
    });
});
exports.insertUsuario = insertUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { password } = _a, resto = __rest(_a, ["password"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, resto);
    res.status(204).json({
        usuario
    });
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Fisicamente lo borraríamos así
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        usuario
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuariosController.js.map