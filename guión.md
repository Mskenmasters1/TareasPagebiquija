# Tareas a realizar

## Backend

### Archivos a eliminar

- categoria.interface.ts
- rol.interface.ts
- models/categoria.ts
- models/rol.ts

### .env

Nombre de la base de datos: grupo2

### models/usuario.ts

Eliminar img y rol.

### usuario.interface.ts

Eliminar img y rol.

### tarea.interface.ts

- Se hace renombrando la interface de producto.
- Cambiamos IProducto por ITarea.
- Se cambia nombre a titulo.
- Se añade la fecha.
- Se añade observaciones como string.
- Se renombra disponible como terminada.
- Se renombra categoria por usuario.
- Se elimina precio.

### models/tarea.ts

- Se renombra el de producto.
- Renombrar nombre por titulo y adecuar el mensaje de error (el título de la tarea es obligatorio).
- Se añade la fecha con required true.
- Se añade observaciones como String.
- Se renombra disponible como terminada y se pone por defecto a false.
- Se renombra categoría por usuario con referencia a usuarios.
- Se ilimina precio.
- La colección se llamará tareas.

## Frontend
