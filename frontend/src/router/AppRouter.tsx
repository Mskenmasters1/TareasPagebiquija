import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { TareasRoutes as TareasRoutes } from '../pages/tareas/TareasRouter';
import { useContext, useEffect } from 'react';
import { ILocalStorageInfo } from '../interfaces/localStorage.interface';
import { IUsuarioInfoContext } from '../interfaces/context.interface';
import { AppContext } from '../context/AppContext';
import { useFetchGet } from '../hooks/useFetchGet';
import { IRefreshToken } from '../interfaces/login.interface';
import { HomePage } from '../pages/homePage';
import { RegisterPage } from '../pages/auth/RegisterPage';

export const AppRouter = () => {
  const { setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const navigate = useNavigate();

  const {
    data: newTokenInfo,
    errorFetch,
    status
  } = useFetchGet<IRefreshToken>('http://localhost:3000/api/auth/refreshToken', true);

  useEffect(() => {
    const infoStorage: ILocalStorageInfo = JSON.parse(localStorage.getItem('usuarioInfo')!);
    infoStorage && setUsuarioInfo({ nombre: infoStorage.nombre });
  }, []);

  useEffect(() => {
    if (newTokenInfo) {
      const infoStorage: ILocalStorageInfo = JSON.parse(localStorage.getItem('usuarioInfo')!);
      infoStorage.token = newTokenInfo.newToken;
      localStorage.setItem('usuarioInfo', JSON.stringify(infoStorage));
    }
  }, [newTokenInfo]);

  useEffect(() => {
    if (status === 401 || errorFetch) {
      localStorage.removeItem('usuarioInfo');
      navigate('/login', {
        replace: true
      });
    }
  }, [status, errorFetch]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="login" element={<RegisterPage />} />

        <Route path="/*" element={<TareasRoutes />} />
      </Routes>
    </main>
  );
};
