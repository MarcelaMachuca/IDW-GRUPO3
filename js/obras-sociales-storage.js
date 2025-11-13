const STORAGE_KEY = 'clinica_obras_sociales';

const OBRAS_SOCIALES_INICIALES = [
  { id: 1, nombre: 'OSDE', descripcion: 'Obra social de medicina prepaga líder', porcentaje: 20 },
  { id: 2, nombre: 'Swiss Medical', descripcion: 'Cobertura médica integral', porcentaje: 25 },
  { id: 3, nombre: 'Galeno', descripcion: 'Medicina prepaga con cobertura nacional', porcentaje: 15 },
  { id: 4, nombre: 'IOMA', descripcion: 'Instituto de Obra Médico Asistencial', porcentaje: 30 },
  { id: 5, nombre: 'PAMI', descripcion: 'Para jubilados y pensionados', porcentaje: 40 }
];

function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(OBRAS_SOCIALES_INICIALES));
  }
}

export function listarObrasSociales() {
  inicializarStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data) || [];
}

export function obtenerObraSocial(id) {
  const obras = listarObrasSociales();
  return obras.find(o => o.id === Number(id));
}

export function crearObraSocial(obraSocial) {
  const obras = listarObrasSociales();
  const nuevoId = obras.length > 0 ? Math.max(...obras.map(o => o.id)) + 1 : 1;
  const nuevaObra = { id: nuevoId, porcentaje: 0, ...obraSocial };
  obras.push(nuevaObra);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obras));
  return nuevaObra;
}

export function actualizarObraSocial(id, datos) {
  const obras = listarObrasSociales();
  const index = obras.findIndex(o => o.id === Number(id));
  if (index !== -1) {
    obras[index] = { ...obras[index], ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obras));
    return obras[index];
  }
  return null;
}

export function eliminarObraSocial(id) {
  let obras = listarObrasSociales();
  obras = obras.filter(o => o.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obras));
  return true;
}

export function calcularValorConDescuento(valorBase, obraSocialId) {
  const obra = obtenerObraSocial(obraSocialId);
  if (!obra) return valorBase;
  const descuento = valorBase * (obra.porcentaje / 100);
  return valorBase - descuento;
}