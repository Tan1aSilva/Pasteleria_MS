function CompartirRedes({ texto }) {
  const url = window.location.href;
  const mensaje = encodeURIComponent(texto + ' ' + url);

  return (
    <div className="d-flex gap-2 justify-content-center align-items-center">
      <span className="small fw-bold">Compartir:</span>
      <a href={'https://wa.me/?text=' + mensaje} target="_blank" rel="noreferrer" className="btn btn-sm btn-borde-rosa">
        WhatsApp
      </a>
      <a href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)} target="_blank" rel="noreferrer" className="btn btn-sm btn-borde-rosa">
        Facebook
      </a>
      <a href={'https://twitter.com/intent/tweet?text=' + mensaje} target="_blank" rel="noreferrer" className="btn btn-sm btn-borde-rosa">
        X
      </a>
    </div>
  );
}

export default CompartirRedes;
