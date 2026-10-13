import { createBrowserRouter } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Carrito from "./pages/carrito/carrito";
import Checkout from "./pages/checkout/checkout";
import Catalogo from "./pages/catalogo/catalogo";
import Login from "./pages/usuario/login";
import Perfil from "./pages/usuario/perfil";
import Registro from "./pages/usuario/registro";

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
]);

export default routes;
