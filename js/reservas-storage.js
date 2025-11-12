import { obtenerMedico } from './medicos-storage.js';
import { obtenerEspecialidad } from './especialidades-storage.js';
import { obtenerObraSocial, calcularValorConDescuento } from './obras-sociales-storage.js';
import { obtenerTurno, marcarTurnoOcupado, marcarTurnoDisponible } from './turnos-storage.js';

const STORAGE_KEY = 'clinica_reservas';

function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

export function listarReservas() {
  inicializarStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data) || [];
}

export function obtenerReserva(id) {
  const reservas = listarReservas();
  return reservas.find(r => r.id === Number(id));
}

export function crearReserva(datos) {
  const reservas = listarReservas();
  const nuevoId = reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1;
  
  const medico = obtenerMedico(datos.medicoId);
  const especialidad = obtenerEspecialidad(datos.especialidadId);
  const obraSocial = obtenerObraSocial(datos.obraSocialId);
  const turno = obtenerTurno(datos.turnoId);
  
  if (!medico || !especialidad || !obraSocial || !turno) {
    throw new Error('Datos inválidos para crear reserva');
  }
  
  if (!turno.disponible) {
    throw new Error('El turno seleccionado ya no está disponible');
  }
  
  const valorTotal = calcularValorConDescuento(medico.valorConsulta, datos.obraSocialId);
  
  const nuevaReserva = {
    id: nuevoId,
    documento: datos.documento,
    apellidoNombre: datos.apellidoNombre,
    turnoId: datos.turnoId,
    especialidadId: datos.especialidadId,
    obraSocialId: datos.obraSocialId,
    medicoId: datos.medicoId,
    valorTotal: parseFloat(valorTotal.toFixed(2)),
    medicoNombre: `${medico.apellido}, ${medico.nombre}`,
    especialidadNombre: especialidad.nombre,
    obraSocialNombre: obraSocial.nombre,
    fecha: turno.fecha,
    hora: turno.hora,
    fechaCreacion: new Date().toISOString()
  };
  
  reservas.push(nuevaReserva);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
  marcarTurnoOcupado(datos.turnoId);
  
  return nuevaReserva;
}

export function actualizarReserva(id, datos) {
  const reservas = listarReservas();
  const index = reservas.findIndex(r => r.id === Number(id));
  if (index !== -1) {
    reservas[index] = { ...reservas[index], ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
    return reservas[index];
  }
  return null;
}

export function eliminarReserva(id) {
  let reservas = listarReservas();
  const reserva = obtenerReserva(id);
  
  if (reserva) {
    marcarTurnoDisponible(reserva.turnoId);
  }
  
  reservas = reservas.filter(r => r.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
  return true;
}

export function obtenerReservasPorMedico(medicoId) {
  const reservas = listarReservas();
  return reservas.filter(r => r.medicoId === Number(medicoId));
}

export function obtenerReservasPorFecha(fecha) {
  const reservas = listarReservas();
  return reservas.filter(r => r.fecha === fecha);
}