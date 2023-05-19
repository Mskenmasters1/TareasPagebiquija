"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarArchivoSubir = void 0;
const validarArchivoSubir = (req, res, next) => {
    if (!req.files || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }
    next();
};
exports.validarArchivoSubir = validarArchivoSubir;
//# sourceMappingURL=validarArchivo.js.map