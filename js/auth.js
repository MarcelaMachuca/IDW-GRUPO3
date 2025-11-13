const SESSION_KEY = 'SESSION_KEY';
const USER_DATA_KEY = 'USER_DATA';

export async function login(usuario, password) {
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usuario, password: password })
    });

    const data = await response.json();

    if (response.ok && data.accessToken) {
      // Guardar token y datos del usuario
      sessionStorage.setItem(SESSION_KEY, data.accessToken);
      sessionStorage.setItem(USER_DATA_KEY, JSON.stringify({
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      }));
      return { success: true, user: data };
    } else {
      return { success: false, message: data.message || 'Usuario o contraseña incorrectos' };
    }
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, message: 'Error de conexión. Intente nuevamente.' };
  }
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(USER_DATA_KEY);
}


export function verificarSesion() {
  const token = sessionStorage.getItem(SESSION_KEY);
  const userData = sessionStorage.getItem(USER_DATA_KEY);
  
  if (token && userData) {
    return {
      token,
      user: JSON.parse(userData)
    };
  }
  return null;
}


export async function verificarSesionConServidor() {
  const token = sessionStorage.getItem(SESSION_KEY);
  
  if (!token) {
    return null;
  }

  try {
    const response = await fetch('https://dummyjson.com/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const user = await response.json();
      // Actualizar datos del usuario
      sessionStorage.setItem(USER_DATA_KEY, JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }));
      return user;
    } else {
      // Token inválido o expirado
      logout();
      return null;
    }
  } catch (error) {
    console.error('Error verificando sesión:', error);
    return null;
  }
}


export function requiereAutenticacion() {
  const session = verificarSesion();
  if (!session) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

export function obtenerUsuarioActual() {
  const session = verificarSesion();
  return session ? session.user : null;
}