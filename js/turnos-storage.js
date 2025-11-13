const STORAGE_KEY = 'clinica_turnos';

function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const turnosIniciales = [
      { id: 1, medicoId: 1, medicoNombre: "Dr. Pérez", especialidad: "Clínica", paciente: "Juan Gómez", fecha: '2025-11-12', hora: '09:00', estado: "Pendiente" },
      { id: 2, medicoId: 2, medicoNombre: "Dra. López", especialidad: "Pediatría", paciente: "Ana Torres", fecha: '2025-11-13', hora: '10:00', estado: "Confirmado" }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turnosIniciales));
  }
}

export function listarTurnos() {
  inicializarStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function obtenerTurno(id) {
  return listarTurnos().find(t => t.id === Number(id));
}

export function crearTurno(turno) {
  const turnos = listarTurnos();
  const nuevoId = turnos.length > 0 ? Math.max(...turnos.map(t => t.id)) + 1 : 1;
  const nuevoTurno = { id: nuevoId, ...turno };
  turnos.push(nuevoTurno);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turnos));
  return nuevoTurno;
}

export function actualizarTurno(id, datosActualizados) {
  const turnos = listarTurnos();
  const index = turnos.findIndex(t => t.id === Number(id));
  if (index !== -1) {
    turnos[index] = { ...turnos[index], ...datosActualizados };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turnos));
  }
}

export function eliminarTurno(id) {
  const turnos = listarTurnos().filter(t => t.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turnos));
}

export function listarTurnosDisponibles() {
  return listarTurnos().filter(t => t.disponible);
}

export function listarTurnosDisponiblesPorMedico(medicoId) {
  return listarTurnos().filter(t => t.medicoId === Number(medicoId) && t.disponible);
}

export function marcarTurnoOcupado(id) {
  const turnos = listarTurnos();
  const index = turnos.findIndex(t => t.id === Number(id));
  if (index !== -1) {
    turnos[index].disponible = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turnos));
  }
}

export function marcarTurnoDisponible(id) {
  const turnos = listarTurnos();
  const index = turnos.findIndex(t => t.id === Number(id));
  if (index !== -1) {
    turnos[index].disponible = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turnos));
  }
}
