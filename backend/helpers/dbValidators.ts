import { Usuario } from '../models/usuario';
import { Tarea } from '../models/tarea';

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

