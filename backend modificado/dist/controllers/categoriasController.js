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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.updateCategoria = exports.insertCategoria = exports.getCategoria = exports.getCategorias = void 0;
const categoria_1 = require("../models/categoria");
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, categorias] = yield Promise.all([
        categoria_1.Categoria.countDocuments(query),
        categoria_1.Categoria.find(query).skip(Number(desde)).limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        categorias
    });
});
exports.getCategorias = getCategorias;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.Categoria.findById(id);
    res.status(200).json(categoria);
});
exports.getCategoria = getCategoria;
const insertCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = yield categoria_1.Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }
    // Generar los datos a guardar
    const data = {
        nombre
    };
    const categoria = new categoria_1.Categoria(data);
    // Guardar DB
    yield categoria.save();
    res.status(201).json(categoria);
});
exports.insertCategoria = insertCategoria;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { estado } = _a, data = __rest(_a, ["estado"]);
    data.nombre = data.nombre.toUpperCase();
    const categoria = yield categoria_1.Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
});
exports.updateCategoria = updateCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoriaBorrada = yield categoria_1.Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(categoriaBorrada);
});
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categoriasController.js.map