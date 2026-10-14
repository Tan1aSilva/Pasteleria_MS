import { createBrowserRouter } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Carrito from "./pages/carrito/carrito";
import Checkout from "./pages/checkout/checkout";
import Catalogo from "./pages/catalogo/catalogo";
import Login from "./pages/usuario/login";
import Perfil from "./pages/usuario/perfil";
import Registro from "./pages/usuario/registro";
import Envios from "./pages/envios/envios";
import Pedidos from "./pages/pedidos/pedidos";
import Blogs from "./pages/blogs/blogs";
import BlogDetalle from "./pages/blogs/blog_detalle";
import Nosotros from "./pages/Nosotros/nosotros";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/carrito",
    element: <Carrito />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/catalogo",
    element: <Catalogo />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/envios",
    element: <Envios />
  },
  {
    path: "/pedidos",
    element: <Pedidos />
  },
  {
    path: "/blogs",
    element: <Blogs />
  },
  {
    path: "/blogs/:id",
    element: <BlogDetalle />
  },
  {
    path: "/nosotros",
    element: <Nosotros />
  }

]);

export default routes;