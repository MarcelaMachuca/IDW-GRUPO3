
const USUARIOS_KEY = 'clinica_usuarios';
const SESSION_KEY = 'clinica_session';


const USUARIOS_INICIALES = [
  {
    id: 1,
    usuario: 'admin',
    password: 'admin123',
    nombre: 'Administrador',
    rol: 'admin'
  }
];


function inicializarUsuarios() {
  if (!localStorage.getItem(USUARIOS_KEY)) {
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(USUARIOS_INICIALES));
  }
}


export function login(usuario, password) {
  inicializarUsuarios();
  const usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY));
  const user = usuarios.find(u => u.usuario === usuario && u.password === password);
  
  if (user) {
    const session = {
      id: user.id,
      usuario: user.usuario,
      nombre: user.nombre,
      rol: user.rol,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }
  
  return { success: false, message: 'Usuario o contraseña incorrectos' };
}


export function logout() {
  localStorage.removeItem(SESSION_KEY);
}


export function verificarSesion() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}


export function requiereAutenticacion() {
  const session = verificarSesion();
  if (!session) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}