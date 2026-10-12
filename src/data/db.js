



const PRODUCTOS_INICIALES = [
  { 
    id: 1, 
    nombre: 'Torta Lúcuta Manjar', 
    porciones: '15 porciones', 
    precio: 18990, 
    stock: 10, 
    categoria: 'Tortas',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&q=80'
  },
  { 
    id: 2, 
    nombre: 'Torta Chocolate Sacher', 
    porciones: '20 porciones', 
    precio: 19500, 
    stock: 3, 
    categoria: 'Tortas',
    imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&q=80'
  },
  { 
    id: 3, 
    nombre: 'Pie de Limón Artesanal', 
    porciones: '10 porciones', 
    precio: 12500, 
    stock: 8, 
    categoria: 'Pies',
    imagen: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=150&q=80'
  }
];

const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Benjamin Escudero', email: 'benjaE7@duocuc.cl', password: '123', rol: 'cliente' },
  { id: 2, nombre: 'Admin Mil Sabores', email: 'admin@milsabores.cl', password: 'admin123', rol: 'admin' }
];


export const initDB = () => {
  if (!localStorage.getItem('milsabores_productos')) {
    localStorage.setItem('milsabores_productos', JSON.stringify(PRODUCTOS_INICIALES));
  }
  if (!localStorage.getItem('milsabores_usuarios')) {
    localStorage.setItem('milsabores_usuarios', JSON.stringify(USUARIOS_INICIALES));
  }
};


export const getProductosDB = () => JSON.parse(localStorage.getItem('milsabores_productos')) || [];

export const saveProductoDB = (prod) => {
  const lista = getProductosDB();
  prod.id = Date.now();
  lista.push(prod);
  localStorage.setItem('milsabores_productos', JSON.stringify(lista));
  return lista;
};

export const deleteProductoDB = (id) => {
  const lista = getProductosDB().filter(p => p.id !== id);
  localStorage.setItem('milsabores_productos', JSON.stringify(lista));
  return lista;
};


export const getUsuariosDB = () => JSON.parse(localStorage.getItem('milsabores_usuarios')) || [];

export const registrarUsuarioDB = (user) => {
  const lista = getUsuariosDB();
  user.id = Date.now();
  user.rol = 'cliente';
  lista.push(user);
  localStorage.setItem('milsabores_usuarios', JSON.stringify(lista));
  return user;
};


export const setUsuarioActivoDB = (usuario) => {
  localStorage.setItem('milsabores_usuario_activo', JSON.stringify(usuario));
  localStorage.setItem('milsabores_ultimo_correo', usuario.email);
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

export const agregarAlCarritoDB = (producto) => {
  const carrito = getCarritoDB();
  const existe = carrito.find(item => item.id === producto.id);
  
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  
  saveCarritoDB(carrito);
  return carrito;
};