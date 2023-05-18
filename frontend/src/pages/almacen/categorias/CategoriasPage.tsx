import { useEffect, useState } from 'react';
import { ICategoriaResponse } from '../../../interfaces/categoria.interface';
import { CategoriasForm } from './CategoriasForm';
import { useFetchGet } from '../../../hooks/useFetchGet';
import { CategoriasTable } from './CategoriasTable';

export const CategoriasPage = () => {
  const [refreshCategorias, setRefreshCategorias] = useState<boolean>(true);
  const {
    loading,
    data: categoriasResponse,
    status,
    errorFetch
  } = useFetchGet<ICategoriaResponse>('http://localhost:3000/api/categorias?desde=0&limite=50', refreshCategorias);

  useEffect(() => {
    if (!loading) {
      setRefreshCategorias(false);
    }
  }, [loading]);

  return (
    <>
      <h1>Categorias</h1>
      <hr />
      <div className="row">
        <div className="col">
          <CategoriasForm setRefreshCategorias={setRefreshCategorias} />
        </div>
        <div className="col">
          {categoriasResponse && (
            <CategoriasTable categoriasResponse={categoriasResponse} setRefreshCategorias={setRefreshCategorias} />
          )}
        </div>
      </div>
    </>
  );
};
