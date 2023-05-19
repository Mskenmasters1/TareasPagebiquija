import { Request, Response } from 'express';
import { Producto } from '../models/tarea';

export const getProductos = async (req: Request, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    // En populate, debemos poner la propiedad que está relacionada con la colección categorías
    Producto.find(query).populate('categoria', 'nombre').skip(Number(desde)).limit(Number(limite))
  ]);

  res.status(200).json({
    total,
    productos
  });
};

export const getProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id).populate('categoria', 'nombre');

  res.status(200).json(producto);
};

export const insertProducto = async (req: Request, res: Response) => {
  const { estado, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre}, ya existe`
    });
  }

  // Generar los datos a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase()
  };

  const producto = new Producto(data);

  // Guardar DB
  await producto.save();

  res.status(201).json(producto);
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.status(204).json(producto);
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

  res.json(productoBorrado);
};
