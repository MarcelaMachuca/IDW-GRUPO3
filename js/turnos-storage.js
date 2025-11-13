const STORAGE_KEY = 'clinica_turnos';

function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const turnosIniciales = [
      { 
        id: 1, 
        medicoId: 1, 
        medicoNombre: "Martínez, Alicia", 
        especialidad: "Cardiología", 
        paciente: "", 
        fecha: '2025-11-15', 
        hora: '09:00', 
        estado: "Pendiente",
        disponible: true 
      },
      { 
        id: 2, 
        medicoId: 1, 
        medicoNombre: "Martínez, Alicia", 
        especialidad: "Cardiología", 
        paciente: "", 
        fecha: '2025-11-15', 
        hora: '10:00', 
        estado: "Pendiente",
        disponible: true 
      },
      { 
        id: 3, 
        medicoId: 1, 
        medicoNombre: "Martínez, Alicia", 
        especialidad: "Cardiología", 
        paciente: "", 
        fecha: '2025-11-16', 
        hora: '09:00', 
        estado: "Pendiente",
        disponible: true 
      },
      { 
        id: 4, 
        medicoId: 2, 
        medicoNombre: "López, José", 
        especialidad: "Pediatría", 
        paciente: "", 
        fecha: '2025-11-15', 
        hora: '09:30', 
        estado: "Pendiente",
        disponible: true 
      },
      { 
        id: 5, 
        medicoId: 2, 
        medicoNombre: "López, José", 
        especialidad: "Pediatría", 
        paciente: "", 
        fecha: '2025-11-15', 
        hora: '11:00', 
        estado: "Pendiente",
        disponible: true 
      },
      { 
        id: 6, 
        medicoId: 3, 
        medicoNombre: "Gómez, Ana", 
        especialidad: "Dermatología", 
        paciente: "", 
        fecha: '2025-11-17', 
        hora: '14:00', 
        estado: "Pendiente",
        disponible: true 
      },
      { 
        id: 7, 
        medicoId: 3, 
        medicoNombre: "Gómez, Ana", 
        especialidad: "Dermatología", 
        paciente: "", 
        fecha: '2025-11-17', 
        hora: '15:00', 
        estado: "Pendiente",
        disponible: true 
      },
      { 
        id: 8, 
        medicoId: 4, 
        medicoNombre: "García, Laura", 
        especialidad: "Oftalmología", 
        paciente: "", 
        fecha: '2025-11-18', 
        hora: '10:00', 
        estado: "Pendiente",
        disponible: true 
      }
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
  const nuevoTurno = { 
    id: nuevoId, 
    disponible: true, 
    ...turno 
  };
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
  return listarTurnos().filter(t => t.disponible !== false && t.estado !== 'Completado' && t.estado !== 'Cancelado');
}

export function listarTurnosDisponiblesPorMedico(medicoId) {
  return listarTurnos().filter(t => t.medicoId === Number(medicoId) && t.disponible !== false && t.estado !== 'Completado' && t.estado !== 'Cancelado');
}

export function marcarTurnoOcupado(id) {
  const turnos = listarTurnos();
  const index = turnos.findIndex(t => t.id === Number(id));
  if (index !== -1) {
    turnos[index].disponible = false;
    turnos[index].estado = 'Confirmado';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turnos));
  }
}

export function marcarTurnoDisponible(id) {
  const turnos = listarTurnos();
  const index = turnos.findIndex(t => t.id === Number(id));
  if (index !== -1) {
    turnos[index].disponible = true;
    turnos[index].estado = 'Pendiente';
    turnos[index].paciente = '';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turnos));
  }
}