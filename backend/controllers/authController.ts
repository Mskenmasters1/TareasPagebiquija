import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario';
import { generarJWT } from '../helpers/generarJwt';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificamos si el email existe
    const usuario = await Usuario.findOne({ email });
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
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    // Generamos el JWT
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Se ha producido un error'
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.header('x-token')!;
  const { id } = jwt.verify(token, process.env.SECRETPRIVATEKEY || '') as jwt.JwtPayload;
  const newToken = await generarJWT(id);
  res.status(200).json({
    newToken
  });
};
