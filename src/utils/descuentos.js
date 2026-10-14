export const COSTO_ENVIO = 3000;

export function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento + 'T00:00:00');
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export function esCumpleanos(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento + 'T00:00:00');
  return hoy.getDate() === nacimiento.getDate() && hoy.getMonth() === nacimiento.getMonth();
}

export function esCorreoDuoc(correo) {
  return correo.toLowerCase().endsWith('@duocuc.cl');
}

export function tieneTortaGratis(usuario) {
  if (!usuario) return false;
  return esCorreoDuoc(usuario.correo) && esCumpleanos(usuario.fechaNacimiento) && usuario.tortaGratisAnio !== new Date().getFullYear();
}

export function calcularTotales(carrito, usuario) {
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  let porcentaje = 0;
  let detalleDescuento = '';
  if (usuario && calcularEdad(usuario.fechaNacimiento) >= 50) {
    porcentaje = 50;
    detalleDescuento = 'Descuento 50% (mayores de 50)';
  } else if (usuario && usuario.codigo === 'FELICES50') {
    porcentaje = 10;
    detalleDescuento = 'Descuento 10% (FELICES50)';
  }

  let tortaGratis = 0;
  if (tieneTortaGratis(usuario)) {
    const tortas = carrito.filter(item => item.nombre.includes('Torta'));
    if (tortas.length > 0) {
      tortaGratis = Math.max(...tortas.map(t => t.precio));
    }
  }

  const descuento = Math.round((subtotal - tortaGratis) * porcentaje / 100);
  const envio = subtotal > 0 ? COSTO_ENVIO : 0;
  const total = subtotal - tortaGratis - descuento + envio;

  return { subtotal, descuento, detalleDescuento, tortaGratis, envio, total };
}
