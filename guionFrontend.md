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

## comboCategorias.tsx

- Renombrar a comboUsuarios.tsx.
- Cambiar categorias por usuarios.
- En el useEffect eliminar el objeto de selecciona una categoría.
- Etiquetar el select con un label for en vez de aria-label. El mensaje será asignar a.
- Usar el context para que el usuario que ha iniciado sesión sea el que esté seleccionado por defecto.

## Navbar

- Renombrarlo a header.
- Retornar un header.
- Sacar fuera el link con la clase navbar-brand y ponerlo en un h1.
- Cambiar Almacén por Gestor de tareas y redirigirlo a la página home.
- Reutilizar el link de categorías para redirigirlo a crear tareas.
- Reutilizar el link de productos para redirigirlo a mis tareas.
- Dejar la opción de cerrar sesión fuera del navbar.
