import { Tareas } from '../models/tarea';
import { Usuario } from '../models/usuario';

export const emailExiste = async (email = '') => {
  // Verificar si el email existe
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

export const existeUsuarioPorId = async (id: string) => {
  // Verificar si el email existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

export const existeTareaPorId = async (id: string) => {
  // Verificar si la tarea existe
  const existeTarea = await Tareas.findById(id);
  if (!existeTarea) {
    throw new Error(`El id no existe ${id}`);
  }
};
