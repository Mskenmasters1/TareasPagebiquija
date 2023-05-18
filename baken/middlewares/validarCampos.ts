import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

// Aquí llega la recopilación de errores de todos los middlewares check de las rutas. Si hay errores, arrojamos un error 400
// Si no hay errores seguimos adelante mediante next
export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next(); // Si no hay errores sigue hacia adelante al siguiente Middleware. Si no hay, continua con el controlador
};
