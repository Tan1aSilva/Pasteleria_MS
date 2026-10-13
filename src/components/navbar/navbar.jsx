import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './navbar.css';

function App_navbar() {
  const navigate = useNavigate();
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem('usuarioActivo'));
    setUsuarioActivo(sesion);
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuarioActivo(null);
    navigate('/login');
  };

  return (
    <header>
      <Navbar expand="lg" className="navbar-pastel navbar-dark shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-white fs-4">
            Mil Sabores
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/catalogo">
                Catálogo
              </Nav.Link>
              <Nav.Link as={Link} to="/carrito">
                Carrito
              </Nav.Link>
              <Nav.Link as={Link} to="/envios">
                Envíos
              </Nav.Link>
              <Nav.Link as={Link} to="/pedidos">
                Mis Pedidos
              </Nav.Link>
            </Nav>

            <div className="d-flex gap-2 align-items-center mt-2 mt-lg-0">
              {usuarioActivo ? (
                <>
                  <Link to="/perfil" className="btn btn-navbar-cafe btn-sm fw-bold">
                    Mi Perfil ({usuarioActivo.nombre?.split(' ')[0] || 'Usuario'})
                  </Link>
                  <button
                    type="button"
                    onClick={handleCerrarSesion}
                    className="btn btn-navbar-rosa btn-sm fw-bold"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-navbar-cafe btn-sm fw-bold">
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" className="btn btn-navbar-rosa btn-sm fw-bold">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default App_navbar;