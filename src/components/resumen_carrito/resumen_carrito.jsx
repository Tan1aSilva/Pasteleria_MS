function ResumenCarrito({ totales, titulo, children }) {
  return (
    <div className="card shadow-sm border-0 p-4">
      <h5 className="mb-3">{titulo}</h5>
      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal</span>
        <span>${totales.subtotal.toLocaleString('es-CL')}</span>
      </div>
      {totales.tortaGratis > 0 && (
        <div className="d-flex justify-content-between mb-2 text-success">
          <span>Torta gratis de cumpleaños</span>
          <span>-${totales.tortaGratis.toLocaleString('es-CL')}</span>
        </div>
      )}
      {totales.descuento > 0 && (
        <div className="d-flex justify-content-between mb-2 text-success">
          <span>{totales.detalleDescuento}</span>
          <span>-${totales.descuento.toLocaleString('es-CL')}</span>
        </div>
      )}
      <div className="d-flex justify-content-between mb-2">
        <span>Envío</span>
        <span>${totales.envio.toLocaleString('es-CL')}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between mb-4">
        <span className="fw-bold fs-5">Total</span>
        <span className="fw-bold fs-5 text-purpura" data-testid="total-carrito">
          ${totales.total.toLocaleString('es-CL')}
        </span>
      </div>
      {children}
    </div>
  );
}

export default ResumenCarrito;
