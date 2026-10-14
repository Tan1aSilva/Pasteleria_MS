const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Benjamin Escudero', correo: 'benjae7@duocuc.cl', clave: '123456', fechaNacimiento: '2003-05-20', telefono: '', direccion: '', codigo: '', preferencia: '', rol: 'cliente' },
  { id: 2, nombre: 'Rosa Martinez', correo: 'rosa@gmail.com', clave: 'rosa123', fechaNacimiento: '1968-08-12', telefono: '', direccion: '', codigo: '', preferencia: 'Manjar', rol: 'cliente' },
  { id: 3, nombre: 'Admin Mil Sabores', correo: 'admin@milsabores.cl', clave: 'admin123', fechaNacimiento: '1990-01-01', telefono: '', direccion: '', codigo: '', preferencia: '', rol: 'admin' }
];


export const initDB = () => {
  if (!localStorage.getItem('milsabores_usuarios')) {
    localStorage.setItem('milsabores_usuarios', JSON.stringify(USUARIOS_INICIALES));
  }
};


export const getUsuariosDB = () => JSON.parse(localStorage.getItem('milsabores_usuarios')) || [];

export const buscarUsuarioDB = (correo, clave) => {
  const usuarios = getUsuariosDB();
  return usuarios.find(
    (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.clave === clave
  ) || null;
};

export const existeCorreoDB = (correo) => {
  return getUsuariosDB().some((u) => u.correo.toLowerCase() === correo.toLowerCase());
};

export const registrarUsuarioDB = (user) => {
  const lista = getUsuariosDB();
  user.id = Date.now();
  user.rol = 'cliente';
  lista.push(user);
  localStorage.setItem('milsabores_usuarios', JSON.stringify(lista));
  return user;
};

export const actualizarUsuarioDB = (usuarioActualizado) => {
  const lista = getUsuariosDB().map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u));
  localStorage.setItem('milsabores_usuarios', JSON.stringify(lista));
  localStorage.setItem('milsabores_usuario_activo', JSON.stringify(usuarioActualizado));
};


export const setUsuarioActivoDB = (usuario) => {
  localStorage.setItem('milsabores_usuario_activo', JSON.stringify(usuario));
  localStorage.setItem('milsabores_ultimo_correo', usuario.correo);
};

export const getUsuarioActivoDB = () => {
  return JSON.parse(localStorage.getItem('milsabores_usuario_activo')) || null;
};

export const cerrarSesionDB = () => {
  localStorage.removeItem('milsabores_usuario_activo');
};

export const getUltimoCorreoDB = () => {
  return localStorage.getItem('milsabores_ultimo_correo') || '';
};


export const getCarritoDB = () => JSON.parse(localStorage.getItem('milsabores_carrito')) || [];

export const saveCarritoDB = (carrito) => {
  localStorage.setItem('milsabores_carrito', JSON.stringify(carrito));
};

export const agregarAlCarritoDB = (producto, cantidad = 1, mensaje = '') => {
  const carrito = getCarritoDB();
  const idLinea = producto.id + '-' + mensaje;
  const existe = carrito.find(item => item.idLinea === idLinea);

  if (existe) {
    existe.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, idLinea, cantidad, mensaje });
  }

  saveCarritoDB(carrito);
  return carrito;
};

export const vaciarCarritoDB = () => {
  localStorage.removeItem('milsabores_carrito');
};


export const getPedidosDB = () => JSON.parse(localStorage.getItem('milsabores_pedidos')) || [];

export const getPedidosUsuarioDB = (usuarioId) => {
  return getPedidosDB().filter(p => p.usuarioId === usuarioId);
};

export const crearPedidoDB = (pedido) => {
  const lista = getPedidosDB();
  pedido.codigo = 'PED-' + (1001 + lista.length);
  pedido.fecha = new Date().toISOString().split('T')[0];
  pedido.estado = 'Preparando';
  lista.push(pedido);
  localStorage.setItem('milsabores_pedidos', JSON.stringify(lista));
  return pedido;
};

export const actualizarPedidoDB = (pedidoActualizado) => {
  const lista = getPedidosDB().map(p => (p.codigo === pedidoActualizado.codigo ? pedidoActualizado : p));
  localStorage.setItem('milsabores_pedidos', JSON.stringify(lista));
};
