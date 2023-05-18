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
Object.defineProperty(exports, "__esModule", { value: true });
exports.coleccionesPermitidas = exports.existeProductoPorId = exports.existeCategoriaPorId = exports.existeUsuarioPorId = exports.emailExiste = exports.esRolValido = void 0;
const rol_1 = require("../models/rol");
const usuario_1 = require("../models/usuario");
const categoria_1 = require("../models/categoria");
const producto_1 = require("../models/producto");
const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_1.Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const emailExiste = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el email existe
    const existeEmail = yield usuario_1.Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email: ${email}, ya está registrado`);
    }
});
exports.emailExiste = emailExiste;
const existeUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el email existe
    const existeUsuario = yield usuario_1.Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
const existeCategoriaPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si la categoría existe
    const existeCategoria = yield categoria_1.Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.existeCategoriaPorId = existeCategoriaPorId;
const existeProductoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeProducto = yield producto_1.Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.existeProductoPorId = existeProductoPorId;
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
};
exports.coleccionesPermitidas = coleccionesPermitidas;
//# sourceMappingURL=dbValidators.js.map