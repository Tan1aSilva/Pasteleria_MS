import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Carrito from './pages/carrito/carrito' 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Página Principal - Pastelería MS</h1>} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App