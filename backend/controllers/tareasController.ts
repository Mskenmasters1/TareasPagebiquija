import { Request, Response } from 'express';
import { Tarea } from '../models/tarea';
import { Usuario } from '../models/usuario';

export const getTareas = async (req: Request, res: Response) => {
  try {
    const tareas = await Tarea.find();

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error de servidor: Ocurrió un error al obtener las tareas." });
  }
};

export const getTareasByUsuario = async (req: Request, res: Response) => {
  try {
    const { idUsuario } = req.params;

    // Verificar el estado del usuario
    const usuario = await Usuario.findById(idUsuario);
    if (!usuario || !usuario.estado) {
      return res.status(404).json({ error: "El usuario no existe o está desactivado." });
    }

    // Obtener las tareas del usuario
    const tareas = await Tarea.find({ usuario: idUsuario });

    if (tareas.length === 0) {
      return res.status(404).json({ error: "No se encontraron tareas para el usuario especificado." });
    }

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error de servidor: Ocurrió un error al obtener las tareas." });
  }
};

export const insertTarea = async (req: Request, res: Response) => {
  try {
    const { ...body } = req.body;

    const tareaDB = await Tarea.findOne({ titulo: body.titulo });

    if (tareaDB) {
      return res.status(400).json({
        msg: `La tarea ${tareaDB.titulo} ya existe.`
      });
    }

    const nuevaTarea = new Tarea(body);
    const tareaGuardada = await nuevaTarea.save();

    res.status(201).json(tareaGuardada);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al insertar la tarea." });
  }
};

export const updateTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ...updates } = req.body;

    const tarea = await Tarea.findByIdAndUpdate(id, updates, { new: true });

    if (!tarea) {
      return res.status(404).json({ error: "La tarea no fue encontrada." });
    }

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al actualizar la tarea." });
  }
};

export const deleteTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tarea = await Tarea.findByIdAndUpdate(id, { estado: false }, { new: true });

    if (!tarea) {
      return res.status(404).json({ error: "La tarea no fue encontrada." });
    }

    res.status(200).json({ message: "La tarea ha sido eliminada con éxito." });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al eliminar la tarea." });
  }
};