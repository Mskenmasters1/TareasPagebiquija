import { useEffect, useState } from 'react';
import { IProductoResponse } from '../../../interfaces/producto.interface';
import { useFetchGet } from '../../../hooks/useFetchGet';
import { ProductosTable } from './ProductosTable';
import { ProductosForm } from './ProductosForm';

export const ProductosPage = () => {
  const [refreshProductos, setRefreshProductos] = useState<boolean>(true);
  const {
    loading,
    data: productosResponse,
    status,
    errorFetch
  } = useFetchGet<IProductoResponse>('http://localhost:3000/api/productos?desde=0&limite=50', refreshProductos);

  useEffect(() => {
    if (!loading) {
      setRefreshProductos(false);
    }
  }, [loading]);

  return (
    <>
      <h1>Productos</h1>
      <hr />
      <div className="row">
        <div className="col-3">
          <ProductosForm setRefreshProductos={setRefreshProductos} />
        </div>
        <div className="col">
          {productosResponse && (
            <ProductosTable productosResponse={productosResponse} setRefreshProductos={setRefreshProductos} />
          )}
        </div>
      </div>
    </>
  );
};
