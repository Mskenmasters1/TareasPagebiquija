"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const config_1 = require("./database/config");
const usuarios_1 = require("./routes/usuarios");
const auth_1 = require("./routes/auth");
const categorias_1 = require("./routes/categorias");
const productos_1 = require("./routes/productos");
const uploads_1 = require("./routes/uploads");
dotenv_1.default.config();
exports.server = (0, express_1.default)();
// Middlewares
exports.server.use(express_1.default.static('public'));
exports.server.use((0, cors_1.default)());
exports.server.use(express_1.default.json());
exports.server.use((0, express_fileupload_1.default)({
    createParentPath: true // Para que cree la carpeta si no existe
}));
// Rutas
exports.server.use('/api/auth', auth_1.routerAuth);
exports.server.use('/api/usuarios', usuarios_1.routerUsuarios);
exports.server.use('/api/categorias', categorias_1.routerCategorias);
exports.server.use('/api/productos', productos_1.routerProductos);
exports.server.use('/api/uploads', uploads_1.routerUploads);
// Base de datos
(0, config_1.dbConnection)();
exports.server.listen(process.env.PORT, () => {
    console.log('Servidor en ejecución en puerto ' + process.env.PORT);
});
//# sourceMappingURL=index.js.map