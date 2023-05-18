import mongoose, { Schema } from 'mongoose';
import { ICategoria } from '../interfaces/categoria.interface';

const categoriaSchema = new Schema<ICategoria>({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  }
});

export const Categoria = mongoose.model('categorias', categoriaSchema);
