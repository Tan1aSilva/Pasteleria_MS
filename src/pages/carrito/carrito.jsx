import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import { getCarritoDB, saveCarritoDB } from '../../data/db';
import estilos from './carrito.module.css';

function Carrito() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const carritoGuardado = getCarritoDB();
    if (carritoGuardado.length === 0) {
      const iniciales = [
        { 
          id: 1, 
          nombre: 'Torta Lúcuta Manjar', 
          porciones: '15 porciones', 
          precio: 18990, 
          cantidad: 1,
          imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&q=80'
        },
        { 
          id: 2, 
          nombre: 'Torta Chocolate Sacher', 
          porciones: '20 porciones', 
          precio: 19500, 
          cantidad: 1,
          imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&q=80'
        }
      ];
      saveCarritoDB(iniciales);
      setItems(iniciales);
    } else {
      setItems(carritoGuardado);
    }
  }, []);

  function cambiarCantidad(id, valor) {
    const cant = Math.max(1, parseInt(valor) || 1);
    const actualizados = items.map(item => item.id === id ? { ...item, cantidad: cant } : item);
    setItems(actualizados);
    saveCarritoDB(actualizados);
  }

  function eliminarItem(id) {
    const actualizados = items.filter(item => item.id !== id);
    setItems(actualizados);
    saveCarritoDB(actualizados);
  }

  const subtotal = items.reduce((acc, i) => acc + (i.precio * i.cantidad), 0);
  const envio = subtotal > 0 ? 3000 : 0;
  const total = subtotal + envio;

  return (
    <>
      <App_navbar />
      <div className={`container ${estilos.contenedor}`}>
        <h2 className={`mb-4 ${estilos.tituloPurpura}`}>Carrito de Compras</h2>

        {items.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            Tu carrito está vacío. ¡Revisa nuestro catálogo para agregar productos!
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
                        <tr key={item.id}>
                          <td className="d-flex align-items-center gap-3">
                            <img 
                              src={item.imagen || 'https://via.placeholder.com/60'} 
                              alt={item.nombre} 
                              style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                            />
                            <div>
                              <div className="fw-bold">{item.nombre}</div>
                              <small className="text-muted">{item.porciones || 'Porción individual'}</small>
                            </div>
                          </td>
                          <td>${item.precio.toLocaleString('es-CL')}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={item.cantidad}
                              min="1"
                              onChange={(e) => cambiarCantidad(item.id, e.target.value)}
                            />
                          </td>
                          <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                          <td>
                            <button
                              onClick={() => eliminarItem(item.id)}
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
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card shadow-sm border-0 p-4">
                <h5 className={`mb-3 ${estilos.tituloPurpura}`}>Resumen del Pedido</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío estimado</span>
                  <span>${envio.toLocaleString('es-CL')}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total</span>
                  <span className={`fw-bold fs-5 ${estilos.tituloPurpura}`} data-testid="total-carrito">
                    ${total.toLocaleString('es-CL')}
                  </span>
                </div>
               
                <button onClick={() => navigate('/checkout')} className={`btn ${estilos.btnRosa} w-100 fw-bold`}>
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Carrito;