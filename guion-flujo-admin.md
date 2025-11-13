
# Guion hablado para presentación del flujo de administración

## 1. Introducción

"Bienvenidos. En este video les voy a mostrar el flujo de administración de la Clínica Salud Integral, tanto desde la interfaz de la página como desde el código fuente. El objetivo es entender cómo el administrador puede gestionar médicos, turnos y reservas de manera sencilla y segura."

## 2. Login y autenticación

"Comenzamos en la página de login, que es `login.html`. Aquí el administrador debe ingresar su usuario y contraseña para acceder al panel. Este formulario está conectado con el archivo `js/auth.js`, donde se valida la autenticidad de los datos ingresados. Si las credenciales son correctas, el sistema redirige automáticamente al panel de administración. Así garantizamos que solo personal autorizado pueda acceder a la gestión de la clínica."

## 3. Panel de administración

"Una vez logueado, accedemos a `panel-admin.html`. En esta página el administrador tiene acceso a todas las funcionalidades principales: puede ver el listado de médicos, agregar nuevos, editar información existente o eliminar registros. Además, desde aquí se gestionan las especialidades, los turnos disponibles y las reservas de los pacientes. La interfaz está pensada para ser intuitiva y rápida, con botones claros para cada acción."

## 4. Gestión de médicos

"La información de los médicos se maneja desde el archivo `js/medicos-storage.js`. Aquí encontramos funciones como `listarMedicos`, que muestra todos los médicos registrados; `crearMedico`, para agregar uno nuevo; `actualizarMedico`, para modificar datos; y `eliminarMedico`, para borrar un registro. Cada vez que el administrador realiza una acción en la página, se llama a una de estas funciones, y la vista se actualiza automáticamente para reflejar los cambios."

## 5. Gestión de turnos y reservas

"Los turnos y reservas se gestionan en los archivos `js/turnos-storage.js` y `js/reservas-storage.js`. El administrador puede ver todos los turnos disponibles, crear nuevos, modificarlos o eliminarlos según sea necesario. Cuando un paciente reserva un turno, esa información se almacena y se vincula con el médico correspondiente. Así, el sistema mantiene organizada la agenda y evita solapamientos."

## 6. Relación entre página y código

"Es importante destacar que cada acción que realizamos en la interfaz del panel está directamente conectada con funciones específicas en el código JavaScript. Por ejemplo, al presionar 'Agregar médico', se ejecuta la función `crearMedico` en `js/medicos-storage.js`. Si editamos un turno, se llama a `actualizarTurno` en `js/turnos-storage.js`. Esto facilita el mantenimiento y la ampliación del sistema, ya que cada funcionalidad está bien separada y documentada."

## 7. Cierre

"En resumen, el flujo de administración de la clínica está diseñado para ser seguro, eficiente y fácil de usar. El código está modularizado: cada parte importante, como login, médicos, turnos y reservas, tiene su propio archivo JS. Esto permite que cualquier desarrollador pueda encontrar rápidamente la lógica detrás de cada acción y realizar mejoras o correcciones de manera ágil. Muchas gracias por su atención."
