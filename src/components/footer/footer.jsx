import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-white py-4 mt-auto" style={{ backgroundColor: '#6B4E71' }}>
      <div className="container text-center">
        <div className="mb-3">
          <Link to="/catalogo" className="text-white me-3">Catálogo</Link>
          <Link to="/blogs" className="text-white me-3">Blog</Link>
          <Link to="/nosotros" className="text-white me-3">Nosotros</Link>
        </div>
        <div className="mb-3">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white me-3">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white me-3">Facebook</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-white">TikTok</a>
        </div>
        <p className="mb-1">2026 Pastelería Mil Sabores. Todos los derechos reservados.</p>
        <small className="text-white-50">Desarrollo Twice - Duoc UC</small>
      </div>
    </footer>
  );
}

export default Footer;
