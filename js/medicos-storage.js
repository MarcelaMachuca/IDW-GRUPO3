import { INITIAL_MEDICOS } from './medicos-init.js';

const STORAGE_KEY = 'clinica_medicos_v1';

function readAll(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEDICOS));
    return INITIAL_MEDICOS.slice();
  }
  try{
    return JSON.parse(raw);
  }catch(e){
    console.error('Error parseando medicos desde LocalStorage', e);
    return [];
  }
}

function writeAll(arr){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function generateId(){
  const items = readAll();
  return items.length ? Math.max(...items.map(m=>m.id)) + 1 : 1;
}

export function listarMedicos(){
  return readAll();
}

export function obtenerMedico(id){
  const items = readAll();
  return items.find(m => m.id === Number(id)) || null;
}

export function crearMedico(data){
  const items = readAll();
  const nuevo = { id: generateId(), ...data };
  items.push(nuevo);
  writeAll(items);
  return nuevo;
}

export function actualizarMedico(id, data){
  const items = readAll();
  const idx = items.findIndex(m => m.id === Number(id));
  if(idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  writeAll(items);
  return items[idx];
}

export function eliminarMedico(id){
  let items = readAll();
  items = items.filter(m => m.id !== Number(id));
  writeAll(items);
}
