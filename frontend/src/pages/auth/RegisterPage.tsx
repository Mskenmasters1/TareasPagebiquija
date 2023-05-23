import { FormEvent, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useFetchPost } from '../../hooks/useFetchPost';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [body, setBody] = useState<string>('');
  const { form, onInputChange } = useForm<IUsuario>({
    nombre: '',
    email: '',
    password: ''
  });

  const { nombre, email, password } = form;

  const {
    loading,
    status,
    errorFetch,
    errorMsg
  } = useFetchPost<IUsuario>('http://localhost:3000/api/usuarios', body, false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const usuario: IUsuario = {
      nombre: nombre,
      email: email,
      password: password
    };
    setBody(JSON.stringify(usuario));
  };

  return (
    <>
    <h1>Alta de usuario</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} required title="Introduzca su nombre"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input className="form-control" id="email" type="email" value={email} onChange={onInputChange} required title="Introduzca un correo electrónico"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input className="form-control" id="password" type="password" value={password} onChange={onInputChange} aria-invalid={password.length >1 && password.length <6 ? 'true' : 'false'} aria-describedby="infoclave" required title="Introduzca una contraseña"/>
          <div id="infoclave">
            {password.length >1 && password.length <6 && 'Esta contraseña es muy corta. Debe tener 6 caracteres como mínimo.'}
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Registrarse
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Registrando...
        </div>
      )}
      {errorFetch && !loading && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
      {status === 201 && !loading && (
        <div className="alert alert-success" role="status" aria-live="polite">
          Registro efectuado con éxito.
        </div>
      )}

<p>
        ¿Ya tiene cuenta?{' '}
        <Link to="/login">Inicie sesión</Link>
      </p>

    </>
  );
};
