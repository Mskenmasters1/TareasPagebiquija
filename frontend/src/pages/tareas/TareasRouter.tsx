import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '../../components/Header';
import { MisTareasPage } from './misTareas/MisTareasPage';
import { Footer } from '../../components/Footer';
import { EditorDeTareasPage } from './misTareas/EditorDeTareasPage';

export const TareasRoutes = () => {
  return (
    <>
        <Routes>
          <Route path="mistareas" element={<MisTareasPage />} />
          <Route path="tareas/crear" element={<EditorDeTareasPage />} />
          <Route path="/*" element={<Navigate to="tareas" />} />
        </Routes>
    </>
  );
};
