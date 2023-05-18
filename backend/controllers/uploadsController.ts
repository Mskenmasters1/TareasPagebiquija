import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { subirArchivo } from '../helpers/subirArchivo';
import { Usuario } from '../models/usuario';
import { Producto } from '../models/producto';
import { IUsuario } from '../interfaces/usuario.interface';
import { Document } from 'mongoose';
import { IProducto } from '../interfaces/producto.interface';
import fileUpload from 'express-fileupload';

export const actualizarImagen = async (req: Request, res: Response) => {
  const { id, coleccion } = req.params;

  let modelo: Document<IProducto> | Document<IUsuario> | null;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }

      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }

      break;

    default:
      return res.status(500).json({ msg: 'Colección incorrecta' });
  }

  // Limpiamos imágenes previas
  if (modelo.get('img')) {
    // Borramos la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.get('img'));
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  try {
    const archivo: fileUpload.FileArray = req.files!;
    const nombre = await subirArchivo(archivo['archivo'], undefined, coleccion);
    modelo.set('img', nombre);

    await modelo.save();

    res.json(modelo);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const mostrarImagen = async (req: Request, res: Response) => {
  const { id, coleccion } = req.params;

  let modelo: Document<IProducto> | Document<IUsuario> | null;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }

      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }

      break;

    default:
      return res.status(500).json({ msg: 'Validación pendiente' });
  }

  if (modelo.get('img')) {
    const pathImagen = path.join(__dirname, '/../uploads/', coleccion, modelo.get('img'));

    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImagen);
};
