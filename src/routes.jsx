import { createBrowserRouter } from 'react-router-dom';
import Inicio from './pages/inicio/Inicio';
import Catalogo from './pages/catalogo/catalogo';
import App_navbar from './components/navbar/navbar';
import Container from 'react-bootstrap/Container';

// Importamos las pantallas de usuario
import Login from './pages/usuario/login';
import Registro from './pages/usuario/registro';
import Perfil from './pages/usuario/perfil';

function PaginaEnConstruccion({ titulo }) {
    return (
        <>
            <App_navbar />
            <Container className="py-5 text-center">
                <h2 style={{ color: '#8B4513', fontWeight: 'bold' }}>{titulo}</h2>
                <p className="text-secondary fs-5">Esta seccion se encuentra actualmente en desarrollo.</p>
            </Container>
        </>
    );
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Inicio />
    },
    {
        path: '/inicio',
        element: <Inicio />
    },
    {
        path: '/catalogo',
        element: <Catalogo />
    },
    {
        path: '/carrito',
        element: <PaginaEnConstruccion titulo="Carrito de Compras" />
    },
    {
        path: '/usuario',
        element: <PaginaEnConstruccion titulo="Perfil de Usuario" />
    },
    {
        path: '/Nosotros',
        element: <PaginaEnConstruccion titulo="Sobre Nosotros" />
    },
    {
        path: '/blogs',
        element: <PaginaEnConstruccion titulo="Blogs y Noticias" />
    },
    {
        path: '/envios',
        element: <PaginaEnConstruccion titulo="Gestion de Envios" />
    },
    {
        path: '/pedidos',
        element: <PaginaEnConstruccion titulo="Historial de Pedidos" />
    },
    // Nuevas rutas agregadas para que funcionen los botones
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/registro',
        element: <Registro />
    },
    {
        path: '/perfil',
        element: <Perfil />
    }
]);