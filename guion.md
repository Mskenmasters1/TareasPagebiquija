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
- middlewares/validarRoles.ts
- middlewares/validarArchivo.ts
- routes/categorias.ts
- routes/upload.ts

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
- Se elimina precio.
- La colección se llamará tareas.
- Lo que se exporta se llame Tareas.

### usuariosController.ts

#### Función getUsuarios

Quitar las llaves para que devuelva un array.

#### Función insertUsuario

- Quitar el rol en la desestructuración de la petición.
- Quitar el rol de la creación del usuario.

### tareasController.ts

- Renombrar productosController.
- Eliminar getProductos.

#### Función getProducto

- Renombrar como getTareas.
- En la consulta se cambia producto por tareas y en el populate cambiar categoria por usuarios.
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
- En el status devolver 200 en vez de 204.

#### Función deleteProducto

- Renombrar por deleteTarea.
- Cambiar productoBorrado por tareaBorrada.

### helpers/dbValidators.ts

- Eliminar función de rol válido.
- Eliminar función de colecciones permitidas.
- Adaptar la función de categorías para que en vez de categorías sea válida para tareas. Por tanto, eliminar la de productos.

### Routes

- La de auth permanece tal cual
- Agregar una ruta para recoger todos los usuarios.
- Eliminar (de momento, la que los edita).
- Adaptar las condiciones quitando lo que afecta a los roles.
- Utilizar el de categorías como modelo para hacer el de tareas.
- Get con todas las tareas.
- Post que compruebe si es una tarea válida y que los campos correspondientes no están vacíos.
- Ruta de put de tareas con las validaciones pertinentes: el título no debe estar vacío, la fecha tampoco, tendría que tener un campo correcto de fecha, el id de tarea tiene que existir.
- Delete de tareas validando el id.

## Frontend

### Primera pantalla: login

- Creación de un formulario de inicio de sesión, y además un botón de registro en caso de que no haya cuenta.
- El formulario de inicio de sesión se compondrá de correo y contraseña.
- Ocultar el formulario de login y mostrar uno de registro en caso de que se pulse ese botón.
- EL formulario de registro tendrá los
campos de nombre, correo y contraseña.
- Al pulsar el botón de registrar mostrar un mensaje de que la operación se ha realizado con éxito y volver a mostrar el formulario de login.
- Iniciar sesión y generar un token desde el back.
- Tener en cuenta la temporización del token y hacer refresh cuando sea necesario.

### Header

- Generar una navbar que tenga los enlaces de crear tarea, y mis tareas.
- Decidir si lo que cierra sesión será un botón o un enlace y aplicar en el header o la navbar, se podría mostrar la información de usuario aquí: algo como cerrar sesión en la cuenta de Peipto.
- Hacer una modal de cierre de sesión para preguntar si uno realmente está seguro de cerrarla.

### Formulario de creación de tareas

- Encabezado de: nueva tarea.
- Campos: título, descripción,  fecha de creación, observaciones, selector de usuarios con una opción de sin asignar.
- Botón de envío. Mensaje con una live region de que se ha creado la tarea.
- Contacto con el back para recoger los usuarios, y para hacer el post de la tarea.

### Página de mis tareas

- Muestreo de mis tareas (a decidir forma) con botón de editar, y botón de eliminar.
- Que el botón de editar nos muestre un formulario como el de crear con los campos ya rellenados para poder tocarlos.
- Un modal para preguntarnos si estamos seguros de eliminar la tarea con un botón de aceptar y uno de cancelar.

## Otros

Eliminar la carpeta dist.

## Posibles mejoras a realizar al proyecto en un futuro

- Página con todas las tareas cargadas.
- Página con tareas asignadas por columnas, como un jira, con categorías a elegir: to do, in progress, revisión, done... con la implicación de crear un nuevo modelo de categorías.
- Permitir la asignación de tareas a varias personas en caso de que estén trabajando en ellas.
- Cambiar la página de mis tareas por un filtro en la página de tareas por columnas general.
- Dejar la página de mis tareas para un muestreo de tareas completo, sin columnas.
- Dejar de mostrar tareas en done si han pasado dos semanas desde su fecha de finalización, pero si mostrarlas en las tareas concretas.
- Permitir el cambio de contraseña si esta se ha olvidado.

## Normas de trabajo

1. Intentar renombrar todo lo que se pueda con f2 desde dentro de visual studio code.
