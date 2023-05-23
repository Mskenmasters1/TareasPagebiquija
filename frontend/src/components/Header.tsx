import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { IUsuarioInfoContext } from '../interfaces/context.interface';

export const Header = () => {
  const { usuarioInfo, setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setUsuarioInfo({ nombre: '' });
    localStorage.removeItem('usuarioInfo');
    // Navegamos a login eliminando el historial reciente para no volver atrás
    navigate('/login', {
      replace: true
    });
  };

  return (
    <>
      <header>
        <h1>          <Link className="navbar-brand" to="/">
          Gestor de tareas <span className="visually-hidden">(Ir a la página de inicio)</span>
        </Link>
        </h1>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`} to="/mistareas">
                  Mis tareas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`} to="/tareas/crear">
                  Crea una tarea
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
          <button className="nav-item nav-link btn" onClick={logout}>
            Cerrar sesión de {usuarioInfo.nombre}
          </button>
        </div>
      </header>
    </>
  );
};
