import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { getUsuarioActivoDB, getPedidosUsuarioDB } from '../../data/db';

function Pedidos() {
    const usuario = getUsuarioActivoDB();
    const pedidos = usuario ? getPedidosUsuarioDB(usuario.id) : [];

    return (
        <>
            <App_navbar />
            <Container className="my-5 flex-grow-1">
                <h2 className="mb-4 text-center fw-bold">Mis Pedidos</h2>

                {!usuario && (
                    <p className="text-center">
                        Debes <Link to="/login">iniciar sesión</Link> para ver tus pedidos.
                    </p>
                )}

                {usuario && pedidos.length === 0 && (
                    <div className="text-center">
                        <p>Aún no tienes pedidos.</p>
                        <Link to="/catalogo" className="btn btn-rosa">Ir al catálogo</Link>
                    </div>
                )}

                {pedidos.map((pedido) => (
                    <Card key={pedido.codigo} className="p-4 mb-4">
                        <div className="d-flex justify-content-between flex-wrap mb-2">
                            <h4>Pedido {pedido.codigo}</h4>
                            <Badge className="badge-rosa fs-6">{pedido.estado}</Badge>
                        </div>
                        <p className="text-secondary mb-3">
                            Comprado el {pedido.fecha} - Entrega el {pedido.fechaEntrega} en {pedido.direccion}, {pedido.comuna}
                        </p>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.items.map((item) => (
                                    <tr key={item.idLinea}>
                                        <td>
                                            {item.nombre}
                                            {item.mensaje && <div className="small text-muted">Mensaje: {item.mensaje}</div>}
                                        </td>
                                        <td>{item.cantidad}</td>
                                        <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold fs-5 text-purpura">Total: ${pedido.total.toLocaleString('es-CL')}</span>
                            <Link to="/envios" className="btn btn-borde-rosa btn-sm">Ver seguimiento</Link>
                        </div>
                    </Card>
                ))}
            </Container>
            <Footer />
        </>
    );
}

export default Pedidos;
