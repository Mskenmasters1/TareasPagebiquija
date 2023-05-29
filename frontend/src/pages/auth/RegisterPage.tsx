import { FormEvent, useContext, useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useFetchPost } from '../../hooks/useFetchPost';
import { useLogin } from '../../hooks/useLogin';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Link, useNavigate } from 'react-router-dom';
import { aplicacion } from '../MainApp';
import { ILocalStorageInfo } from '../../interfaces/localStorage.interface';
import { AppContext } from '../../context/AppContext';
import { IUsuarioInfoContext } from '../../interfaces/context.interface';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const [body, setBody] = useState<string>('');
  const { form, onInputChange } = useForm<IUsuario>({
    nombre: '',
    email: '',
    password: ''
  });

  const { nombre, email, password } = form;
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');

  const {
    loading,
    status,
    errorFetch,
    errorMsg
  } = useFetchPost<IUsuario>('http://localhost:3000/api/usuarios', body, false);

  const {
    loading: loginLoading,
    loginResponse,
    status: loginStatus,
    errorFetch: loginErrorFetch,
    errorMsg: loginErrorMsg
  } = useLogin(email, password, status === 201);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setMessage('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
      setMessageType('danger');
      return;
    }

    const usuario: IUsuario = {
      nombre: nombre,
      email: email,
      password: password
    };
    setBody(JSON.stringify(usuario));
  };

  useEffect(() => {
    if (loading) {
      setMessage('Registrando...');
      setMessageType('warning');
    } else if (errorFetch) {
      setMessage(errorMsg);
      setMessageType('danger');
    } else if (status === 201) {
      setMessage('Registro efectuado con éxito. Iniciando sesión...');
      setMessageType('success');
    } else {
      setMessage('');
      setMessageType('');
    }
  }, [loading, errorFetch, status]);

  useEffect(() => {
    if (loginStatus === 200 && loginErrorMsg === '') {
      setMessage('Redirigiendo...');
      setMessageType('success');
      setUsuarioInfo({ nombre: loginResponse.usuario.nombre });
      const infoUsuarioStorage: ILocalStorageInfo = {
        nombre: loginResponse.usuario.nombre,
        token: loginResponse.token
      };
      localStorage.setItem('usuarioInfo', JSON.stringify(infoUsuarioStorage));
      setTimeout(() => navigate('/', { replace: true }), 5000);
    } else if (loginErrorFetch) {
      setMessage('Error durante el inicio de sesión. Por favor, inténtelo de nuevo.');
      setMessageType('danger');
    }
  }, [loginStatus, loginErrorMsg]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000); // Los mensajes se borraran después de 5 segundos

      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }
  }, [message]);

  useEffect(() => {
    document.title = 'Registro - ' + aplicacion;
  }, []);

return (
    <>
      <h1>Alta de usuario</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} required title="Introduzca su nombre" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input className="form-control" id="email" type="email" value={email} onChange={onInputChange} required title="Introduzca un correo electrónico" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input className="form-control" id="password" type="password" value={password} onChange={onInputChange} aria-invalid={password.length > 1 && password.length < 6 ? 'true' : 'false'} aria-describedby="infoclave" required title="Introduzca una contraseña" />
          <div id="infoclave">
            {password.length > 1 && password.length < 6 && 'Esta contraseña es muy corta. Debe tener 6 caracteres como mínimo.'}
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">Confirmación de contraseña</label>
          <input className="form-control" id="repeatPassword" type="password" value={repeatPassword} onChange={(e) => { setRepeatPassword(e.target.value); }} aria-invalid={password.length > 1 && password.length < 6 ? 'true' : 'false'} required title="Repita la contraseña" />
        </div>
        <button className="btn btn-success" type="submit">
          Registrarse
        </button>
      </form>

      {message && (
        <div className={`alert alert-${messageType}`} role="region" aria-live="assertive">
          {message}
        </div>
      )}

      <p>
        ¿Ya tiene cuenta?{' '}
        <Link to="/login">Inicie sesión</Link>
      </p>

    </>
  );
};
