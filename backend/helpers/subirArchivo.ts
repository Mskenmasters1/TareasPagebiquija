import fileUpload from 'express-fileupload';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const subirArchivo = (
  files: fileUpload.UploadedFile[] | fileUpload.UploadedFile,
  extensionesValidas = ['png', 'jpg', 'jpeg'],
  carpeta = ''
) => {
  return new Promise((resolve, reject) => {
    const archivo = files as fileUpload.UploadedFile;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    // Validamos la extension
    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '/../uploads/', carpeta, nombreTemp);

    archivo.mv(uploadPath, (err: any) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};
