import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { existeCorreoDB, registrarUsuarioDB, setUsuarioActivoDB } from '../../data/db';
import { calcularEdad, esCorreoDuoc } from '../../utils/descuentos';

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [codigo, setCodigo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !fechaNacimiento || !clave || !confirmarClave) {
      setError('Por favor llena todos los campos requeridos');
      return;
    }

    if (clave !== confirmarClave) {
      setError('Las contraseñas no coinciden, revisa de nuevo');
      return;
    }

    if (clave.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    if (calcularEdad(fechaNacimiento) < 0 || calcularEdad(fechaNacimiento) > 120) {
      setError('La fecha de nacimiento no es válida');
      return;
    }

    if (codigo && codigo.toUpperCase() !== 'FELICES50') {
      setError('El código promocional no es válido');
      return;
    }

    if (existeCorreoDB(correo)) {
      setError('El correo electrónico ya se encuentra registrado');
      return;
    }

    const nuevoUsuario = registrarUsuarioDB({
      nombre,
      correo,
      clave,
      fechaNacimiento,
      telefono,
      direccion: '',
      codigo: codigo.toUpperCase(),
      preferencia: '',
    });

    setUsuarioActivoDB(nuevoUsuario);
    navigate('/perfil');
  };

  return (
    <>
      <App_navbar />
      <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="fw-bold mb-3 text-purpura text-center">Crear Cuenta</h4>

              {error && (
                <div className="alert alert-danger py-2 text-center rounded-3 mb-3" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="regNombre" className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="regNombre"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="regEmail" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="regEmail"
                    value={correo}
                    onChange={(e) => {
                      setCorreo(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="regNacimiento" className="form-label">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    id="regNacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => {
                      setFechaNacimiento(e.target.value);
                      setError('');
                    }}
                  />
                  {fechaNacimiento && calcularEdad(fechaNacimiento) >= 50 && (
                    <small className="text-success">¡Tienes 50% de descuento en todos los productos!</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="regTelefono" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="regTelefono"
                    placeholder="+56 9 1234 5678"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="regPassword" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="regPassword"
                    value={clave}
                    onChange={(e) => {
                      setClave(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="regConfirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="regConfirmPassword"
                    value={confirmarClave}
                    onChange={(e) => {
                      setConfirmarClave(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="regCodigo" className="form-label">Código Promocional (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="regCodigo"
                    placeholder="FELICES50"
                    value={codigo}
                    onChange={(e) => {
                      setCodigo(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                {esCorreoDuoc(correo) && (
                  <div className="alert alert-success py-2">
                    Con tu correo Duoc tendrás una torta gratis el día de tu cumpleaños.
                  </div>
                )}
                <button type="submit" className="btn btn-rosa w-100 fw-bold">
                  Crear Cuenta
                </button>
              </form>

              <p className="text-center mt-3 mb-0">
                ¿Ya tienes cuenta? <Link to="/login" className="text-purpura">Inicia sesión aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Registro;