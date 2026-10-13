import { createBrowserRouter } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Carrito from "./pages/carrito/carrito"; 
import Checkout from "./pages/checkout/Checkout";

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
    path: "/pedidos",
    element: <Checkout />,
  },
]);

export default routes;
