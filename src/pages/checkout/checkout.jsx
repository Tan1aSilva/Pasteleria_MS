import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import { getCarritoDB } from '../../data/db';

function Checkout() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const productos = getCarritoDB();
    const subtotal = productos.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const envio = subtotal > 0 ? 3000 : 0;
    setTotal(subtotal + envio);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
    navigate('/');
  }

  return (
    <>
      <App_navbar />
      <div className="container my-5">
        <h2 className="mb-4">Finalizar Compra</h2>

        <div className="row g-4">
          <div className="col-md-7">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Datos de Envío</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre Completo</label>
                  <input type="text" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input type="text" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Método de Pago</label>
                  <select className="form-select">
                    <option value="webpay">Webpay / Tarjeta</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-success w-100 mt-3">
                  Pagar ${total.toLocaleString('es-CL')}
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Resumen</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Total a pagar:</span>
                <strong>${total.toLocaleString('es-CL')}</strong>
              </div>
              <hr />
              <Link to="/carrito" className="btn btn-outline-secondary w-100">
                Volver al carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;