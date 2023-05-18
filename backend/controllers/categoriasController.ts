import { Request, Response } from 'express';
import { Categoria } from '../models/categoria';

export const getCategorias = async (req: Request, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(Number(desde)).limit(Number(limite))
  ]);

  res.status(200).json({
    total,
    categorias
  });
};

export const getCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);

  res.status(200).json(categoria);
};

export const insertCategoria = async (req: Request, res: Response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`
    });
  }

  // Generar los datos a guardar
  const data = {
    nombre
  };

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

  res.json(categoriaBorrada);
};
