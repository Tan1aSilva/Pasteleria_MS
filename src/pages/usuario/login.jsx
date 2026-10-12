import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import './usuario.css';

function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (correo.trim() === '' || clave.trim() === '') {
      setError('Por favor llena todos los campos');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioValido = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.clave === clave
    );

    if (usuarioValido) {
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));
      navigate('/perfil');
    } else {
      setError('Correo electrónico o contraseña incorrectos');
    }
  };

  return (
    <>
      <App_navbar />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="fw-bold mb-3 text-purpura text-center">Iniciar Sesión</h4>

              {error && (
                <div className="alert alert-danger py-2 text-center rounded-3 mb-3" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    value={correo}
                    onChange={(e) => {
                      setCorreo(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    value={clave}
                    onChange={(e) => {
                      setClave(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-rosa w-100 fw-bold">
                  Ingresar
                </button>
              </form>

              <p className="text-center mt-3 mb-0">
                ¿No tienes cuenta? <Link to="/registro" className="text-purpura">Regístrate aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;