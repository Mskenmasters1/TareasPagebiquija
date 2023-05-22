# Cómo realizar el frontend

## Eliminar

- interfaces/categoria.interface.ts
- hooks/useFetchFileDownload.ts
- hooks/useFetchFileUpload.ts
- pages/almacen/categorias/categoriasModal.tsx
- pages/almacen/categorias/categoriasPage.tsx
- pages/almacen/categorias/categoriasTable.tsx

## usuario.interface.ts

Quitamos imagen y rol.

## producto.interface.ts

- Renombrar a tarea.interface.ts.
- Cambiar nombre por titulo.
- Cambiar cateoria por usuario y ICategoria por IUsuario.
- Borrar el precio.
- Cambiar disponible por terminada.
- Añadir observaciones como string.
- Añadir la fecha como string.