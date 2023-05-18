import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { IUsuarioInfoContext } from '../interfaces/context.interface';

export const Navbar = () => {
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
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
      <Link className="navbar-brand" to="categorias">
        Almacén
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`} to="/categorias">
              Categorías
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`} to="/productos">
              Productos
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <li>
            <span className="nav-item nav-link text-primary">{usuarioInfo.nombre}</span>
          </li>
          <li>
            <button className="nav-item nav-link btn" onClick={logout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
