import mongoose, { Schema } from 'mongoose';
import { IRol } from '../interfaces/rol.interface';

const rolSchema = new Schema<IRol>({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio']
  }
});

export const Rol = mongoose.model('roles', rolSchema);
