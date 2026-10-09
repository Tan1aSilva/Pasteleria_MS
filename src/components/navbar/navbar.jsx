import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function App_navbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Mil Sabores</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
            <Nav.Link as={Link} to="/envios">Envíos</Nav.Link>
            <Nav.Link as={Link} to="/pedidos">Mis Pedidos</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/sesion">Iniciar Sesión</Nav.Link>
            <Nav.Link as={Link} to="/cuenta">Mi Cuenta</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App_navbar;