import { Router } from 'express';
import { check } from 'express-validator';
import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';
import { deleteUsuario, getUsuarios, insertUsuario, updateUsuario } from '../controllers/usuariosController';
import { validarJWT } from '../middlewares/validarJwt';
import { esAdminRol } from '../middlewares/validarRoles';

export const routerUsuarios = Router();

// check va almacenando los errores para que el validationResult concluya el proceso de revisión. Este validationResult lo tenemos en validarCampos
// Si hay errores, validarCampos devolverá un error. Si no los hay, ejecutará el resto del controller (insertUsuario o updateUsuario)

// En las peticiones, incluimos el middleware para comprobar el acceso de personas autenticadas
routerUsuarios.get('/', [validarJWT], getUsuarios);

routerUsuarios.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
  ],
  insertUsuario
);

routerUsuarios.put(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
  ],
  updateUsuario
);

routerUsuarios.delete(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ],
  deleteUsuario
);
