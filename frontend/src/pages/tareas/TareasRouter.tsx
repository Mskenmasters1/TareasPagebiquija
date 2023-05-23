import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '../../components/Header';
import { MisTareasPage } from './misTareas/MisTareasPage';

export const TareasRoutes = () => {
  return (
    <>
      <Header />

      <div className="container">
        <Routes>
          <Route path="mistareas" element={<MisTareasPage />} />
          <Route path="tareas/crear" element={<CrearTareasPage />} />

          <Route path="/*" element={<Navigate to="tareas" />} />
        </Routes>
      </div>
    </>
  );
};
