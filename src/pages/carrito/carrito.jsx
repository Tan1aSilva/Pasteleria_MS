import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ResumenCarrito from '../../components/resumen_carrito/resumen_carrito';
import { getCarritoDB, saveCarritoDB, getUsuarioActivoDB } from '../../data/db';
import { calcularTotales } from '../../utils/descuentos';
import estilos from './carrito.module.css';

function Carrito() {
  const navigate = useNavigate();
  const [items, setItems] = useState(getCarritoDB());
  const usuario = getUsuarioActivoDB();

  function cambiarCantidad(idLinea, valor) {
    const cant = Math.max(1, parseInt(valor) || 1);
    const actualizados = items.map(item => item.idLinea === idLinea ? { ...item, cantidad: cant } : item);
    setItems(actualizados);
    saveCarritoDB(actualizados);
  }

  function eliminarItem(idLinea) {
    const actualizados = items.filter(item => item.idLinea !== idLinea);
    setItems(actualizados);
    saveCarritoDB(actualizados);
  }

  function vaciarCarrito() {
    setItems([]);
    saveCarritoDB([]);
  }

  const totales = calcularTotales(items, usuario);

  return (
    <>
      <App_navbar />
      <div className={`container flex-grow-1 ${estilos.contenedor}`}>
        <h2 className={`mb-4 ${estilos.tituloPurpura}`}>Carrito de Compras</h2>

        {items.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            Tu carrito está vacío. ¡Revisa nuestro <Link to="/catalogo">catálogo</Link> para agregar productos!
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm border-0 p-3">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th style={{ width: '100px' }}>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.idLinea}>
                          <td className="d-flex align-items-center gap-3">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <div>
                              <div className="fw-bold">{item.nombre}</div>
                              {item.mensaje && <small className="text-muted">Mensaje: {item.mensaje}</small>}
                            </div>
                          </td>
                          <td>${item.precio.toLocaleString('es-CL')}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={item.cantidad}
                              min="1"
                              aria-label={'Cantidad de ' + item.nombre}
                              onChange={(e) => cambiarCantidad(item.idLinea, e.target.value)}
                            />
                          </td>
                          <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                          <td>
                            <button
                              onClick={() => eliminarItem(item.idLinea)}
                              className="btn btn-outline-danger btn-sm"
                              aria-label="Eliminar producto"
                            >
                              &times;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="btn btn-link text-danger align-self-end" onClick={vaciarCarrito}>
                  Vaciar carrito
                </button>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              {!usuario && (
                <div className="alert caja-rosa">
                  <Link to="/login">Inicia sesión</Link> para aplicar tus descuentos.
                </div>
              )}
              <ResumenCarrito totales={totales} titulo="Resumen del Pedido">
                <button onClick={() => navigate('/checkout')} className={`btn ${estilos.btnRosa} w-100 fw-bold`}>
                  Proceder al Pago
                </button>
              </ResumenCarrito>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Carrito;
