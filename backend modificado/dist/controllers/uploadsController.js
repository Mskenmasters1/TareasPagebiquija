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
exports.mostrarImagen = exports.actualizarImagen = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const subirArchivo_1 = require("../helpers/subirArchivo");
const usuario_1 = require("../models/usuario");
const producto_1 = require("../models/producto");
const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield usuario_1.Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = yield producto_1.Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Colección incorrecta' });
    }
    // Limpiamos imágenes previas
    if (modelo.get('img')) {
        // Borramos la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.get('img'));
        if (fs_1.default.existsSync(pathImagen)) {
            fs_1.default.unlinkSync(pathImagen);
        }
    }
    try {
        const archivo = req.files;
        const nombre = yield (0, subirArchivo_1.subirArchivo)(archivo['archivo'], undefined, coleccion);
        modelo.set('img', nombre);
        yield modelo.save();
        res.json(modelo);
    }
    catch (error) {
        return res.status(500).json({ msg: error });
    }
});
exports.actualizarImagen = actualizarImagen;
const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield usuario_1.Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = yield producto_1.Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Validación pendiente' });
    }
    if (modelo.get('img')) {
        const pathImagen = path_1.default.join(__dirname, '/../uploads/', coleccion, modelo.get('img'));
        if (fs_1.default.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathImagen = path_1.default.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);
});
exports.mostrarImagen = mostrarImagen;
//# sourceMappingURL=uploadsController.js.map