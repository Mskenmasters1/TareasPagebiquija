import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.find({});
  res.status(200).json({
    usuarios
  });
};

export const insertUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password, rol } = req.body;
  const usuario = new Usuario({ nombre, email, password, rol });

  // Encriptar la contraseña (hash)
  // bcrypt nos pide que para encriptar agreguemos un salt
  // Un salt es un fragmento aleatorio que se usará para generar el hash asociado al password
  // Así evitamos que el hash sea el mismo para el mismo password. El valor que se genera es aleatorio y se guarda en la base de datos
  // getSaltSync permite elegir el "saltRounds", es decir, cuantas "vueltas" utiliza para generar el valor. Por defecto son 10 y es considerado un número equilibrado
  // entre el tiempo de generación y la seguridad
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.status(201).json({
    usuario
  });
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(204).json({
    usuario
  });
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Fisicamente lo borraríamos así
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({
    usuario
  });
};
