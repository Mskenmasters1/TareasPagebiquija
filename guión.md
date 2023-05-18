# Tareas a realizar

## Backend

### Archivos a eliminar

- categoria.interface.ts
- rol.interface.ts
- models/categoria.ts
- models/rol.ts
- controllers/categoriasController.ts
- controllers/uploadsController.ts
- helpers/subirArchivo.ts

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
- Lo que se exporta se llame Tareas.

### usuariosController.ts

#### Función getUsuarios

Quitar las llaves para que devuelva un array.

#### Función insertUsuario

- Quitar el rol en la desestructuración de la petición.
- Quitar el rol de la creación del usuario.

### tareasController.ts

Renombrar productosController.
- Eliminar getProductos.

#### Función getProducto

- Renombrar como getTareas.
- En la consulta se cambia prdocuto por tareas y en el populate cambiar categoria por usuarios.
- Cambiar producto por tareas en el json que se devuelve.

#### Función insertProducto

- Renombrar a insertTarea.
- Cambiar productoDB por tareaDB.
- Cambiar nombre por titulo.
- Cambiar el mensaje de error (por ejemplo, la tarea ya existe).
- En la creación de data eliminar la conversión del nombre a mayúsculas.

#### Función updateProducto

- Renombrar por updateTarea.
- Eliminar la conversión a mayúsculas.
- Cambiar producto por tarea.
- Cambiar Producto por Tareas.
- en el status devolver 200 en vez de 204.

#### Función deleteProducto

- Renombrar por deleteTarea.
- Cambiar productoBorrado por tareaBorrada.

## Frontend

## Otros

Eliminar la carpeta dist.
