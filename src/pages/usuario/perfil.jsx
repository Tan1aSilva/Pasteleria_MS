import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import './usuario.css';

function Perfil() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (sesion) {
      setUsuarioActivo(sesion);
      setNombre(sesion.nombre || '');
      setCorreo(sesion.correo || '');
    } else {
      setNombre('Diego Silva');
      setCorreo('diego@duocuc.cl');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuarioActivo) {
      const usuarioActualizado = { ...usuarioActivo, nombre, correo };
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActualizado));

      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const index = usuarios.findIndex((u) => u.id === usuarioActivo.id);
      if (index !== -1) {
        usuarios[index] = usuarioActualizado;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      }
    }

    setMensaje('Cambios guardados con éxito');
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    navigate('/login');
  };

  return (
    <>
      <App_navbar />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-purpura mb-0">Perfil de Usuario</h3>
                {usuarioActivo && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm fw-bold rounded-3"
                    onClick={handleCerrarSesion}
                  >
                    Cerrar Sesión
                  </button>
                )}
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
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-rosa fw-bold">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Perfil;