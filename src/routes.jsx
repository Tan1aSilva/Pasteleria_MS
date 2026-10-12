import { createBrowserRouter } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Carrito from "./pages/carrito/carrito";
import Login from "./pages/usuario/login";
import Registro from "./pages/usuario/registro";
import Perfil from "./pages/usuario/perfil";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
]);

export default routes;