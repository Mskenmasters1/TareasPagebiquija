import mongoose, { Schema } from 'mongoose';
import { IProducto } from '../interfaces/producto.interface';
import { Categoria } from './categoria';

const tareaSchema = new Schema<IProducto>({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  precio: {
    type: Number,
    default: 0
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'categorias',
    required: true
  },
  descripcion: { type: String },
  disponible: { type: Boolean, default: true }
});

export const tarea = mongoose.model('tareas', tareaSchema);
