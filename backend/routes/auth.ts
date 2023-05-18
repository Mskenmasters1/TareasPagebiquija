import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';
import { login, refreshToken } from '../controllers/authController';
import { validarJWT } from '../middlewares/validarJwt';

export const routerAuth = Router();

routerAuth.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
  ],
  login
);

routerAuth.get('/refreshToken', validarJWT, refreshToken);