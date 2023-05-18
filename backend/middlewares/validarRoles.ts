import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario';

export const esAdminRol = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-token')!;

  try {
    const { id } = jwt.verify(token, process.env.SECRETPRIVATEKEY || '') as jwt.JwtPayload;

    // Leemos el usuario que corresponde al id
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario inexistente'
      });
    }

    // Verificamos si el id tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false'
      });
    }
    const { rol, nombre } = usuario;

    // Verificamos si es administrador
    if (rol !== 'ADMIN_ROLE') {
      return res.status(401).json({
        msg: `${nombre} no es administrador - No puede hacer esto`
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido'
    });
  }
};
