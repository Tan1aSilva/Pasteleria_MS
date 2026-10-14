import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { getUsuarioActivoDB, actualizarUsuarioDB, cerrarSesionDB } from '../../data/db';
import { calcularEdad, esCorreoDuoc, tieneTortaGratis } from '../../utils/descuentos';

function Perfil() {
  const navigate = useNavigate();
  const usuarioActivo = getUsuarioActivoDB();
  const [nombre, setNombre] = useState(usuarioActivo ? usuarioActivo.nombre : '');
  const [telefono, setTelefono] = useState(usuarioActivo ? usuarioActivo.telefono : '');
  const [direccion, setDireccion] = useState(usuarioActivo ? usuarioActivo.direccion : '');
  const [preferencia, setPreferencia] = useState(usuarioActivo ? usuarioActivo.preferencia : '');
  const [mensaje, setMensaje] = useState('');

  if (!usuarioActivo) {
    return (
      <>
        <App_navbar />
        <main className="container my-5 flex-grow-1 text-center">
          <h3 className="mb-3">Perfil de Usuario</h3>
          <p>Debes iniciar sesión para ver tu perfil.</p>
          <Link to="/login" className="btn btn-rosa">Iniciar Sesión</Link>
        </main>
        <Footer />
      </>
    );
  }

  const edad = calcularEdad(usuarioActivo.fechaNacimiento);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioActualizado = { ...usuarioActivo, nombre, telefono, direccion, preferencia };
    actualizarUsuarioDB(usuarioActualizado);

    setMensaje('Cambios guardados con éxito');
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleCerrarSesion = () => {
    cerrarSesionDB();
    navigate('/login');
  };

  return (
    <>
      <App_navbar />
      <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-purpura mb-0">Perfil de Usuario</h3>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm fw-bold rounded-3"
                  onClick={handleCerrarSesion}
                >
                  Cerrar Sesión
                </button>
              </div>

              <div className="caja-rosa p-3 mb-4">
                <h6 className="fw-bold">Mis beneficios</h6>
                <ul className="mb-0 small">
                  {edad >= 50 && <li>50% de descuento en todos los productos</li>}
                  {edad < 50 && usuarioActivo.codigo === 'FELICES50' && <li>10% de descuento de por vida (FELICES50)</li>}
                  {tieneTortaGratis(usuarioActivo) && <li>¡Feliz cumpleaños! Hoy tienes una torta gratis</li>}
                  {esCorreoDuoc(usuarioActivo.correo) && !tieneTortaGratis(usuarioActivo) && <li>Torta gratis el día de tu cumpleaños (estudiante Duoc)</li>}
                  {edad < 50 && usuarioActivo.codigo !== 'FELICES50' && !esCorreoDuoc(usuarioActivo.correo) && <li>Aún no tienes beneficios</li>}
                </ul>
              </div>

              {mensaje && (
                <div className="alert alert-success py-2 text-center rounded-3 mb-3" role="alert">
                  {mensaje}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailPerfil" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailPerfil"
                    value={usuarioActivo.correo}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefonoPerfil" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefonoPerfil"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="direccionPerfil" className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccionPerfil"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="preferenciaPerfil" className="form-label">Sabor favorito</label>
                  <select
                    className="form-select"
                    id="preferenciaPerfil"
                    value={preferencia}
                    onChange={(e) => setPreferencia(e.target.value)}
                  >
                    <option value="">Sin preferencia</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Manjar">Manjar y Tradicional</option>
                    <option value="Frutas">Frutas</option>
                    <option value="Saludable">Sin Azúcar / Vegano</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-rosa fw-bold">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Perfil;
