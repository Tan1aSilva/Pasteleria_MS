import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { getUsuarioActivoDB, getCarritoDB, cerrarSesionDB } from '../../data/db';
import styles from './navbar.module.css';

function App_navbar() {
  const navigate = useNavigate();
  const usuarioActivo = getUsuarioActivoDB();
  const cantidadCarrito = getCarritoDB().reduce((acc, item) => acc + item.cantidad, 0);

  const handleCerrarSesion = () => {
    cerrarSesionDB();
    navigate('/login');
  };

  return (
    <header>
      <Navbar expand="lg" className={`${styles['navbar-pastel']} navbar-dark shadow-sm`}>
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
                Carrito <Badge bg="light" text="dark" pill data-testid="cantidad-carrito">{cantidadCarrito}</Badge>
              </Nav.Link>
              <Nav.Link as={Link} to="/envios">
                Envíos
              </Nav.Link>
              {usuarioActivo && (
                <Nav.Link as={Link} to="/pedidos">
                  Mis Pedidos
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/blogs">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/nosotros">
                Nosotros
              </Nav.Link>
            </Nav>

            <div className="d-flex gap-2 align-items-center mt-2 mt-lg-0">
              {usuarioActivo ? (
                <>
                  <Link to="/perfil" className={`btn ${styles['btn-navbar-cafe']} btn-sm fw-bold`}>
                    Mi Perfil ({usuarioActivo.nombre.split(' ')[0]})
                  </Link>
                  <button
                    type="button"
                    onClick={handleCerrarSesion}
                    className={`btn ${styles['btn-navbar-rosa']} btn-sm fw-bold`}
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`btn ${styles['btn-navbar-cafe']} btn-sm fw-bold`}>
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" className={`btn ${styles['btn-navbar-rosa']} btn-sm fw-bold`}>
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
