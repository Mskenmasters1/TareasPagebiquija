import mongoose, { Schema } from 'mongoose';
import { IUsuario } from '../interfaces/usuario.interface';

// Los mensajes de validación los valida el modelo. Nosotros haremos nuestras validaciones intermedias
// pero es bueno ponerlas por si acaso se nos olvida alguna validación

const usuarioSchema = new Schema<IUsuario>({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'] // Para solo acpetar unos determinados valores
  },
  estado: {
    type: Boolean,
    default: true
  }
});

export const Usuario = mongoose.model('usuarios', usuarioSchema);
