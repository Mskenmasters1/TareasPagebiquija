import { Rol } from '../models/rol';
import { Usuario } from '../models/usuario';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';

export const esRolValido = async (rol = '') => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

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

export const existeCategoriaPorId = async (id: string) => {
  // Verificar si la categoría existe
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

export const existeProductoPorId = async (id: string) => {
  // Verificar si el correo existe
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

export const coleccionesPermitidas = (coleccion = '', colecciones: string[] = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
  }
  return true;
};
