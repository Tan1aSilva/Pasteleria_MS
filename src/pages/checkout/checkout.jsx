import { useState } from 'react';
import { Link } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ResumenCarrito from '../../components/resumen_carrito/resumen_carrito';
import { getCarritoDB, vaciarCarritoDB, getUsuarioActivoDB, actualizarUsuarioDB, crearPedidoDB } from '../../data/db';
import { calcularTotales } from '../../utils/descuentos';

function fechaConDias(dias) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return fecha.getFullYear() + '-' + mes + '-' + dia;
}

function Checkout() {
  const usuario = getUsuarioActivoDB();
  const [productos] = useState(getCarritoDB());
  const [nombre, setNombre] = useState(usuario ? usuario.nombre : '');
  const [direccion, setDireccion] = useState(usuario ? usuario.direccion : '');
  const [comuna, setComuna] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [metodoPago, setMetodoPago] = useState('webpay');
  const [error, setError] = useState('');
  const [pedidoCreado, setPedidoCreado] = useState(null);

  const totales = calcularTotales(productos, usuario);
  const fechaMinima = fechaConDias(1);
  const fechaMaxima = fechaConDias(30);

  function handleSubmit(e) {
    e.preventDefault();

    if (!nombre || !direccion || !comuna || !fechaEntrega) {
      setError('Por favor completa todos los datos de envío');
      return;
    }

    if (fechaEntrega < fechaMinima || fechaEntrega > fechaMaxima) {
      setError('La fecha de entrega debe ser entre mañana y los próximos 30 días');
      return;
    }

    const pedido = crearPedidoDB({
      usuarioId: usuario.id,
      cliente: nombre,
      direccion: direccion,
      comuna: comuna,
      fechaEntrega: fechaEntrega,
      metodoPago: metodoPago,
      items: productos,
      total: totales.total,
    });

    if (totales.tortaGratis > 0) {
      actualizarUsuarioDB({ ...usuario, tortaGratisAnio: new Date().getFullYear() });
    }

    vaciarCarritoDB();
    setPedidoCreado(pedido);
  }

  if (!usuario) {
    return (
      <>
        <App_navbar />
        <div className="container my-5 flex-grow-1 text-center">
          <h2 className="mb-3">Finalizar Compra</h2>
          <p>Debes iniciar sesión para finalizar tu compra.</p>
          <Link to="/login" className="btn btn-rosa">Iniciar Sesión</Link>
        </div>
        <Footer />
      </>
    );
  }

  if (pedidoCreado) {
    return (
      <>
        <App_navbar />
        <div className="container my-5 flex-grow-1">
          <div className="card p-4 shadow-sm text-center mx-auto" style={{ maxWidth: '600px' }}>
            <h2 className="mb-3">¡Gracias por tu compra!</h2>
            <p className="mb-1">Tu código de pedido es:</p>
            <p className="fs-3 fw-bold text-purpura">{pedidoCreado.codigo}</p>
            <p>Total pagado: ${pedidoCreado.total.toLocaleString('es-CL')} - Entrega: {pedidoCreado.fechaEntrega}</p>
            <div className="d-flex gap-2 justify-content-center">
              <Link to="/pedidos" className="btn btn-rosa">Ver mis pedidos</Link>
              <Link to="/envios" className="btn btn-borde-rosa">Seguir mi envío</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (productos.length === 0) {
    return (
      <>
        <App_navbar />
        <div className="container my-5 flex-grow-1 text-center">
          <h2 className="mb-3">Finalizar Compra</h2>
          <p>No tienes productos en el carrito.</p>
          <Link to="/catalogo" className="btn btn-rosa">Ir al catálogo</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <App_navbar />
      <div className="container my-5 flex-grow-1">
        <h2 className="mb-4">Finalizar Compra</h2>

        <div className="row g-4">
          <div className="col-md-7">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Datos de Envío</h5>

              {error && (
                <div className="alert alert-danger py-2 text-center rounded-3 mb-3" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombreEnvio" className="form-label">Nombre Completo</label>
                  <input type="text" id="nombreEnvio" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label htmlFor="direccionEnvio" className="form-label">Dirección</label>
                  <input type="text" id="direccionEnvio" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label htmlFor="comunaEnvio" className="form-label">Comuna</label>
                  <select id="comunaEnvio" className="form-select" value={comuna} onChange={(e) => setComuna(e.target.value)}>
                    <option value="">Selecciona tu comuna</option>
                    <option value="Santiago">Santiago</option>
                    <option value="Providencia">Providencia</option>
                    <option value="Ñuñoa">Ñuñoa</option>
                    <option value="Las Condes">Las Condes</option>
                    <option value="Maipú">Maipú</option>
                    <option value="La Florida">La Florida</option>
                    <option value="Puente Alto">Puente Alto</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="fechaEntrega" className="form-label">Fecha de Entrega Preferida</label>
                  <input type="date" id="fechaEntrega" className="form-control" min={fechaMinima} max={fechaMaxima} value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label htmlFor="metodoPago" className="form-label">Método de Pago</label>
                  <select id="metodoPago" className="form-select" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                    <option value="webpay">Webpay / Tarjeta</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-rosa w-100 mt-3">
                  Pagar ${totales.total.toLocaleString('es-CL')}
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-5">
            <ResumenCarrito totales={totales} titulo="Resumen">
              <Link to="/carrito" className="btn btn-outline-secondary w-100">
                Volver al carrito
              </Link>
            </ResumenCarrito>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
