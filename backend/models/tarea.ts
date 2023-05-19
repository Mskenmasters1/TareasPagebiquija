import mongoose, { Schema } from 'mongoose';
import { ITarea } from '../interfaces/tarea.interface';

const tareaSchema = new Schema<ITarea>({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  fecha: {
    type: Date,
        required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  },
  descripcion: { type: String },
  terminada: { type: Boolean, default: true },
    observaciones: { type: String }
});

export const Producto = mongoose.model('productos', tareaSchema);
