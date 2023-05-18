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
exports.deleteProducto = exports.updateProducto = exports.insertProducto = exports.getProducto = exports.getProductos = void 0;
const producto_1 = require("../models/producto");
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, productos] = yield Promise.all([
        producto_1.Producto.countDocuments(query),
        // En populate, debemos poner la propiedad que está relacionada con la colección categorías
        producto_1.Producto.find(query).populate('categoria', 'nombre').skip(Number(desde)).limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        productos
    });
});
exports.getProductos = getProductos;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.Producto.findById(id).populate('categoria', 'nombre');
    res.status(200).json(producto);
});
exports.getProducto = getProducto;
const insertProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    const productoDB = yield producto_1.Producto.findOne({ nombre: body.nombre.toUpperCase() });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }
    // Generar los datos a guardar
    const data = Object.assign(Object.assign({}, body), { nombre: body.nombre.toUpperCase() });
    const producto = new producto_1.Producto(data);
    // Guardar DB
    yield producto.save();
    res.status(201).json(producto);
});
exports.insertProducto = insertProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado } = _b, data = __rest(_b, ["estado"]);
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    const producto = yield producto_1.Producto.findByIdAndUpdate(id, data, { new: true });
    res.status(204).json(producto);
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productoBorrado = yield producto_1.Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoBorrado);
});
exports.deleteProducto = deleteProducto;
//# sourceMappingURL=productosController.js.map