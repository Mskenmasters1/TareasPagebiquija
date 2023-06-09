import { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useForm } from '../../hooks/useForm';
import { ILogin, ILoginResponse } from '../../interfaces/login.interface';
import { IUsuarioInfoContext } from '../../interfaces/context.interface';
import { ILocalStorageInfo } from '../../interfaces/localStorage.interface';
import { useFetchPost } from '../../hooks/useFetchPost';
import { aplicacion } from '../MainApp';

export const LoginPage = () => {
  // Nos traemos el contexto con el usuario y la función que lo cambia
  const { setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const [body, setBody] = useState<string>('');
  const navigate = useNavigate();

  const { form, onInputChange, onResetForm } = useForm<ILogin>({
    email: '',
    password: ''
  });

  const { email, password } = form;

  const {
    loading,
    data: loginResponse,
    status,
    errorFetch,
    errorMsg
  } = useFetchPost<ILoginResponse>('http://localhost:3000/api/auth/login', body, false);

  const login = (e: FormEvent) => {
    e.preventDefault();
    setBody(JSON.stringify({ email, password }));
  };

  useEffect(() => {
    if (status === 200 && errorMsg === '') {
      setUsuarioInfo({ nombre: loginResponse.usuario.nombre });
      const infoUsuarioStorage: ILocalStorageInfo = {
        nombre: loginResponse.usuario.nombre,
        token: loginResponse.token
      };
      localStorage.setItem('usuarioInfo', JSON.stringify(infoUsuarioStorage));
      navigate('/', {
        replace: true
      });
    }
  }, [status, errorMsg]);
useEffect(() => {
  document.title = 'Inicio de sesión - ' + aplicacion;
}, []);
  return (
    <>
      <h1>Inicio de sesión</h1>
      <hr />

      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" type="email" title="Introduzca su correo electrónico" className="form-control" value={email} onChange={onInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            title="Introduzca su contraseña"
            onChange={onInputChange}
            required
          />
        </div>
        <button className="btn btn-success" type="submit" disabled={email.trim() === '' || password.trim() === ''}>
          Iniciar sesión
        </button>
        <button className="btn btn-warning" type="button" onClick={onResetForm}>
          Borrar
        </button>
      </form>
      {loading && (
        <div className="alert alert-warning" role="alert">
          Autenticando...
        </div>
      )}
      {/* Si errorFetch es true, mostramos un mensaje de error al usuario */}
      {errorFetch && !loading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}


<p>
        ¿No tiene cuenta?{' '}
        <Link to="/register">Regístrese</Link>
      </p>
    </>
  );
};
