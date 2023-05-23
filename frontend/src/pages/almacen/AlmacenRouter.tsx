import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '../../components/Header';
import { CategoriasPage } from './categorias/CategoriasPage';
import { ProductosPage } from './productos/ProductosPage';

export const AlmacenRoutes = () => {
  return (
    <>
      <Header />

      <div className="container">
        <Routes>
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="productos" element={<ProductosPage />} />

          <Route path="/*" element={<Navigate to="categorias" />} />
        </Routes>
      </div>
    </>
  );
};
