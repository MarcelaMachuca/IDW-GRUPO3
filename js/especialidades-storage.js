const STORAGE_KEY = 'clinica_especialidades';


const ESPECIALIDADES_INICIALES = [
  { id: 1, nombre: 'Cardiología', descripcion: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón' },
  { id: 2, nombre: 'Pediatría', descripcion: 'Rama de la medicina que se especializa en la salud y las enfermedades de los niños' },
  { id: 3, nombre: 'Dermatología', descripcion: 'Especialidad médica que se ocupa del estudio de la piel y sus enfermedades' },
  { id: 4, nombre: 'Oftalmología', descripcion: 'Especialidad médica que estudia las enfermedades de ojo y su tratamiento' }
];


function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ESPECIALIDADES_INICIALES));
  }
}


export function listarEspecialidades() {
  inicializarStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data) || [];
}


export function obtenerEspecialidad(id) {
  const especialidades = listarEspecialidades();
  return especialidades.find(e => e.id === Number(id));
}


export function crearEspecialidad(especialidad) {
  const especialidades = listarEspecialidades();
  const nuevoId = especialidades.length > 0 ? Math.max(...especialidades.map(e => e.id)) + 1 : 1;
  const nuevaEspecialidad = { id: nuevoId, ...especialidad };
  especialidades.push(nuevaEspecialidad);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(especialidades));
  return nuevaEspecialidad;
}


export function actualizarEspecialidad(id, datos) {
  const especialidades = listarEspecialidades();
  const index = especialidades.findIndex(e => e.id === id);
  if (index !== -1) {
    especialidades[index] = { ...especialidades[index], ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(especialidades));
    return especialidades[index];
  }
  return null;
}


export function eliminarEspecialidad(id) {
  let especialidades = listarEspecialidades();
  especialidades = especialidades.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(especialidades));
  return true;
}