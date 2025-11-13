const STORAGE_KEY = 'clinica_medicos';

// DATOS INICIALES COMPLETOS
const MEDICOS_INICIALES = [
  {
    id: 1,
    matricula: 12345,
    apellido: 'Martínez',
    nombre: 'Alicia',
    especialidadId: 1,
    descripcion: 'Especialista en cardiología con más de 15 años de experiencia.',
    obrasSociales: [1, 2, 3],
    fotografia: '',
    imagen: 'imagen/dra.alicia.jpg',
    valorConsulta: 13000.00,
    telefono: '3511234567',
    email: 'alicia.martinez@clinica.com'
  },
  {
    id: 2,
    matricula: 23456,
    apellido: 'López',
    nombre: 'José',
    especialidadId: 2,
    descripcion: 'Pediatra dedicado al cuidado integral de niños y adolescentes.',
    obrasSociales: [1, 2, 4],
    fotografia: '',
    imagen: 'imagen/dr.jose.jpg',
    valorConsulta: 12000.00,
    telefono: '3519876543',
    email: 'jose.lopez@clinica.com'
  },
  {
    id: 3,
    matricula: 34567,
    apellido: 'Gómez',
    nombre: 'Ana',
    especialidadId: 3,
    descripcion: 'Dermatóloga especializada en tratamientos de piel.',
    obrasSociales: [1, 3, 5],
    fotografia: '',
    imagen: 'imagen/dra.ana.jpg',
    valorConsulta: 13500.00,
    telefono: '3517654321',
    email: 'ana.gomez@clinica.com'
  },
  {
    id: 4,
    matricula: 32853,
    apellido: 'García',
    nombre: 'Laura',
    especialidadId: 4,
    descripcion: 'Especialidad médica que estudia las enfermedades de ojo y su tratamiento.',
    obrasSociales: [1, 3, 5],
    fotografia: '',
    imagen: 'imagen/default-doctor.jpg',
    valorConsulta: 14500.00,
    telefono: '3519988776',
    email: 'laura.garcia@clinica.com'
  }
];

function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MEDICOS_INICIALES));
  }
}

export function listarMedicos() {
  inicializarStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data) || [];
}

export function obtenerMedico(id) {
  const medicos = listarMedicos();
  return medicos.find(m => m.id === Number(id));
}

export function convertirImagenABase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

export async function crearMedico(medico, archivoImagen = null) {
  const medicos = listarMedicos();
  const nuevoId = medicos.length > 0 ? Math.max(...medicos.map(m => m.id)) + 1 : 1;
  let fotografiaBase64 = '';

  if (archivoImagen) {
    fotografiaBase64 = await convertirImagenABase64(archivoImagen);
  }

  const nuevoMedico = {
    id: nuevoId,
    matricula: medico.matricula || 0,
    apellido: medico.apellido || '',
    nombre: medico.nombre || '',
    especialidadId: Number(medico.especialidadId) || null,
    descripcion: medico.descripcion || '',
    obrasSociales: medico.obrasSociales || [],
    fotografia: fotografiaBase64,
    imagen: medico.imagen || '',
    valorConsulta: Number(medico.valorConsulta) || 0,
    telefono: medico.telefono || '',
    email: medico.email || ''
  };

  medicos.push(nuevoMedico);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(medicos));
  return nuevoMedico;
}

export async function actualizarMedico(id, datos, archivoImagen = null) {
  const medicos = listarMedicos();
  const index = medicos.findIndex(m => m.id === Number(id));
  if (index !== -1) {
    if (archivoImagen) {
      const base64 = await convertirImagenABase64(archivoImagen);
      datos.fotografia = base64;
    }
    medicos[index] = { ...medicos[index], ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicos));
    return medicos[index];
  }
  return null;
}

export function eliminarMedico(id) {
  let medicos = listarMedicos();
  medicos = medicos.filter(m => m.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(medicos));
  return true;
}

export function obtenerNombreCompleto(medico) {
  if (!medico) return 'Desconocido';
  const apellido = medico.apellido || '';
  const nombre = medico.nombre || '';
  return `${apellido}, ${nombre}`.trim();
}
