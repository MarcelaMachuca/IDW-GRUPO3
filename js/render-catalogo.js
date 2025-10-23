import { listarMedicos } from './medicos-storage.js';

function crearCard(medico){
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'card h-100 shadow-sm border-0';

  const img = document.createElement('img');
  img.src = medico.imagen || 'imagen/logo.png';
  img.alt = medico.nombre;
  img.className = 'card-img-top';
  img.style.height = '250px';
  img.style.objectFit = 'cover';

  const body = document.createElement('div');
  body.className = 'card-body d-flex flex-column align-items-center text-center';

  const h3 = document.createElement('h3');
  h3.className = 'card-title';
  h3.textContent = medico.nombre;

  const p = document.createElement('p');
  p.className = 'card-text text-muted';
  p.textContent = medico.especialidad;

  const a = document.createElement('a');
  a.className = 'btn btn-clinica w-100 mt-auto';
  a.href = `reservar.html?doctor=${encodeURIComponent(medico.nombre)}`;
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = 'Reservar Turno';

  body.appendChild(h3);
  body.appendChild(p);
  body.appendChild(a);

  card.appendChild(img);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}

export function renderCatalogo(containerSelector){
  const container = document.querySelector(containerSelector);
  if(!container) return;
  container.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'row g-4';
  const medicos = listarMedicos();
  for(const m of medicos){
    row.appendChild(crearCard(m));
  }
  container.appendChild(row);
}
