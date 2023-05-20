import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';


export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find({});
    res.status(200).json(usuarios);
  }
  catch (error) {
    res.status(500).json({ msg: `Internal server error ${error}` });
  }
};

//insertar un nuevo usuario encriptando la contraseña
export const insertUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  try {
    const usuario = new Usuario({ nombre, email, password });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(201).json({
      usuario
    });
  }
  catch (error) {
    res.status(500).json({ msg: `Internal server error ${error}` });
  }
};

// Eliminar usuario
export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    if (!usuario) {
      return res.status(404).json({
        msg: `El usuario con ${id} no existe`
      });
    }

    res.status(200).json({ msg: 'El usuario se ha eliminado', usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hubo un error al eliminar el usuario con id ${id}: ${error}`
    });
  }
};
