"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Generamos nuestro propio proceso asíncrono (Promise) para generar el token
const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        // jwt nos va a crear un token bajo una firma con una expiración determinada (2 horas en nuestro caso)
        jsonwebtoken_1.default.sign(payload, process.env.SECRETPRIVATEKEY || '', {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=generarJwt.js.map