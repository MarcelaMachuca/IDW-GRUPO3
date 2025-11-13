### 🏥 Clínica Salud Integral — Panel Web

📋 Descripción General

Este proyecto es una aplicación web de gestión de una clínica, desarrollada en HTML, CSS, JavaScript (ES Modules) y Bootstrap 5, que funciona completamente en el navegador utilizando LocalStorage como base de datos local.

Permite gestionar la información de médicos, especialidades, obras sociales y turnos, así como realizar reservas desde la interfaz pública.
---



## ✨ Características

- ✅ Catálogo de profesionales médicos
- ✅ Sistema de reserva de turnos en 5 pasos
- ✅ Cálculo automático de descuentos según obra social
- ✅ Panel administrativo completo (CRUD)
- ✅ Gestión de médicos, especialidades, obras sociales y turnos
- ✅ Visualización de reservas con filtros
- ✅ Exportación de datos a CSV
- ✅ Diseño responsivo y adaptativo
- ✅ Persistencia de datos con LocalStorage

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados con variables CSS
- **JavaScript (ES6+)** - Módulos, import/export
- **Bootstrap 5.3.8** - Framework CSS
- **Font Awesome 6.4.0** - Iconografía
- **LocalStorage API** - Persistencia de datos

---

## 📁 Estructura del Proyecto

clinica-salud-integral/
│
├── index.html                    # Página principal (catálogo de médicos)
├── institucional.html            # Información de la clínica
├── contacto.html                 # Página de contacto
├── reservar.html                 # Sistema de reserva de turnos
├── login.html                    # Login administrativo
├── panel-admin.html              # Panel de administración principal
├── admin-medicos.html            # CRUD de médicos
├── admin-especialidades.html     # CRUD de especialidades
├── admin-obras-sociales.html     # CRUD de obras sociales
├── admin-turnos.html             # CRUD de turnos
├── admin-reservas.html           # Visualización de reservas
├── estilos.css                   # Estilos globales
│
├── js/
│   ├── auth.js                   # Autenticación y sesiones
│   ├── medicos-storage.js        # Gestión de médicos (LocalStorage)
│   ├── especialidades-storage.js # Gestión de especialidades
│   ├── obras-sociales-storage.js # Gestión de obras sociales
│   ├── turnos-storage.js         # Gestión de turnos
│   └── reservas-storage.js       # Gestión de reservas
│
└── imagen/
    ├── logo.png                  # Logo de la clínica
    ├── dra.alicia.jpg            # Foto Dra. Alicia Martínez
    ├── dr.jose.jpg               # Foto Dr. José López
    ├── dra.ana.jpg               # Foto Dra. Ana Gómez
    └── default-doctor.jpg        # Imagen por defecto


--
## 💾 Módulos JavaScript

### `medicos-storage.js`
Administra los datos de los médicos registrados.

**Funciones principales:**
- `listarMedicos()`
- `obtenerMedico(id)`
- `crearMedico(medico, archivoImagen)`
- `actualizarMedico(id, datos, archivoImagen)`
- `eliminarMedico(id)`
- `obtenerNombreCompleto(medico)`

Incluye campos: `id`, `matricula`, `apellido`, `nombre`, `especialidadId`, `descripcion`, `obrasSociales`, `fotografia` (base64), `imagen` (ruta), `valorConsulta`, `telefono`, `email`.

---

### `especialidades-storage.js`
Administra las especialidades médicas.

**Funciones principales:**
- `listarEspecialidades()`
- `obtenerEspecialidad(id)`
- `crearEspecialidad(especialidad)`
- `actualizarEspecialidad(id, datos)`
- `eliminarEspecialidad(id)`

Incluye especialidades iniciales: Cardiología, Pediatría, Dermatología, Oftalmología.

---

### `obras-sociales-storage.js`
Administra las obras sociales y sus porcentajes de descuento.

**Funciones principales:**
- `listarObrasSociales()`
- `obtenerObraSocial(id)`
- `crearObraSocial(obra)`
- `actualizarObraSocial(id, datos)`
- `eliminarObraSocial(id)`
- `calcularValorConDescuento(valorBase, obraSocialId)`

---

### `turnos-storage.js`
Administra turnos (disponibles y reservados).

**Funciones principales:**
- `listarTurnos()`
- `listarTurnosDisponibles()`
- `listarTurnosDisponiblesPorMedico(medicoId)`
- `obtenerTurno(id)`
- `crearTurno(turno)` / `agregarTurno(turno)`
- `actualizarTurno(id, datos)` 
- `eliminarTurno(id)`
- `marcarTurnoOcupado(id)` / `marcarTurnoDisponible(id)`

---

### `reservas-storage.js`
Administra las reservas realizadas por pacientes.

**Funciones principales:**
- `listarReservas()`
- `obtenerReserva(id)`
- `crearReserva(datos)` 
- `actualizarReserva(id, datos)`
- `eliminarReserva(id)` 

---

## 🧭 Funcionamiento General

- **Catálogo dinámico**: La página pública (`index.html`) genera dinámicamente las tarjetas de profesionales leyendo `medicos-storage.js`.  
- **Panel administrativo**: Desde `panel-admin.html` se accede a cada sección para administrar entidades mediante tablas y formularios.  
- **Persistencia**: Todos los datos se guardan en `localStorage`. Si la clave correspondiente no existe, se cargan datos iniciales.
- **Reservas**: Al confirmar una reserva, se registra en `reservas` y el turno correspondiente se marca como ocupado.

---

## 🔐 Acceso / Login (versión actual)


**Credenciales por defecto:**

- ** Usuario:** `admin`  
- **Contraseña:** `admin123`



---

## 🖼️ Imágenes y Archivos

- Las imágenes de médicos pueden guardarse en `imagen/` o en el campo `fotografia` (Base64) dentro de cada objeto médico.
- Si la imagen falla, las vistas usan una imagen por defecto (`imagen/default-doctor.jpg`).

---

## 🧪 Pruebas y Uso

1. Abrir `index.html` con Live Server o desde la raíz del proyecto (usar Live Server recomendado para módulos ES).  
2. Ir a **Acceso Administrador** o `login.html`, ingresar con `admin` / `admin123`.  
3. Navegar a **Panel Administrativo** → administrar médicos, especialidades, obras sociales, turnos y reservas.  
4. Comprobar que las operaciones CRUD actualizan la tabla y `localStorage`.

---

## Link del repositorio: https://github.com/MarcelaMachuca/IDW-GRUPO3

## Integrantes:
1. Tiago Reyes (fvgz),
2. Natalia Noemi Ruiz (nataliaruiz04),
3. Camila Abigail Wagner (abigail-wagner),
4. Marcela Carina Machuca (MarcelaMachuca),
5. Elizabeth Ruth Flores (elizabethf3)
