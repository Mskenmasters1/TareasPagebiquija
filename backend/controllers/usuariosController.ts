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
  const { email } = req.body;
  try {
    const existeEmail = await Usuario.findOne({ email: email });
    if (existeEmail) {
      return res.status(400).json({ msg: `Ya existe un usuario con el Email ${email}` });
    }
    const usuario = new Usuario(req.body);
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(usuario.password, salt);
    await usuario.save();
    res.status(201).json({
      msg: 'Usuario creado correctamente',
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
    const usuario = await Usuario.findByIdAndDelete(id);

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
