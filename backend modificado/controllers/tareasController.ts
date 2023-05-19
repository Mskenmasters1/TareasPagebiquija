import { Request, Response } from 'express';
import { Tareas } from '../models/tarea';

export const getTareas = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tarea = await Tareas.findById(id).populate('usuarios', 'nombre');

  res.status(200).json(tarea);
};

export const insertTarea = async (req: Request, res: Response) => {
  const { estado, ...body } = req.body;

  const tareaDB = await Tareas.findOne({});

  if (tareaDB) {
    return res.status(400).json({
      msg: `La tarea ${tareaDB.titulo}, ya existe`
    });
  }

  // Generar los datos a guardar
  const data = {
    ...body,
    titulo: body.titulo()
  };

  const tarea = new Tareas(data);

  // Guardar DB
  await tarea.save();

  res.status(201).json(tarea);
};

export const updateTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado, ...data } = req.body;

  const tarea = await Tareas.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json(tarea);
};

export const deleteTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tareaBorrada = await Tareas.findByIdAndUpdate(id, { estado: false }, { new: true });

  res.json(tareaBorrada);
};
