import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { getUsuarioActivoDB, getPedidosDB, getPedidosUsuarioDB, actualizarPedidoDB } from '../../data/db';
import estilos from './envios.module.css';

const ESTADOS = ['Preparando', 'En Camino', 'Entregado'];

function Envios() {
    const usuario = getUsuarioActivoDB();
    const [envios, setEnvios] = useState(usuario ? getPedidosUsuarioDB(usuario.id) : []);

    const [idPedido, setIdPedido] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');

    const [buscarCodigo, setBuscarCodigo] = useState('');
    const [resultado, setResultado] = useState(null);
    const [mensajeError, setMensajeError] = useState('');
    const [notificacion, setNotificacion] = useState('');

    function cambiarFecha(e) {
        e.preventDefault();

        const pedido = envios.find((item) => item.codigo === idPedido);
        if (!pedido || !fechaEntrega) {
            setMensajeError('Selecciona un pedido y una fecha');
            return;
        }

        const actualizado = { ...pedido, fechaEntrega: fechaEntrega };
        actualizarPedidoDB(actualizado);
        setEnvios(envios.map((item) => (item.codigo === idPedido ? actualizado : item)));
        setNotificacion('La entrega del pedido ' + idPedido + ' se cambió para el ' + fechaEntrega);
        setMensajeError('');
        setIdPedido('');
        setFechaEntrega('');
    }

    function actualizarEstado(codigo) {
        const nuevosEnvios = envios.map((item) => {
            if (item.codigo !== codigo) return item;
            const actual = ESTADOS.indexOf(item.estado);
            if (actual < ESTADOS.length - 1) {
                const actualizado = { ...item, estado: ESTADOS[actual + 1] };
                actualizarPedidoDB(actualizado);
                setNotificacion('Tu pedido ' + codigo + ' ahora está: ' + actualizado.estado);
                return actualizado;
            }
            return item;
        });
        setEnvios(nuevosEnvios);
    }

    function consultarEstado() {
        const encontrado = getPedidosDB().find((e) => e.codigo === buscarCodigo.trim().toUpperCase());

        if (encontrado) {
            setResultado(encontrado);
            setMensajeError('');
        } else {
            setResultado(null);
            setMensajeError('Código de envío no encontrado');
        }
    }

    return (
        <div className={`d-flex flex-column min-vh-100 ${estilos.pagina}`}>
            <App_navbar />

            <Container as="main" className="my-5 flex-grow-1">
                <h2 className={`mb-4 text-center fw-bold ${estilos.titulo}`}>
                    Gestión y Seguimiento de Envíos
                </h2>

                {notificacion && (
                    <Alert variant="success" dismissible onClose={() => setNotificacion('')}>
                        {notificacion}
                    </Alert>
                )}

                <Row className="g-4">
                    <Col md={6}>
                        <Card className={`p-4 border-0 rounded-3 h-100 ${estilos.tarjeta}`}>
                            <h4 className={`mb-3 ${estilos.titulo}`}>Cambiar Fecha de Entrega</h4>
                            {usuario ? (
                                <Form onSubmit={cambiarFecha}>
                                    <Form.Group className="mb-3" controlId="idPedido">
                                        <Form.Label>Pedido</Form.Label>
                                        <Form.Select value={idPedido} onChange={(e) => setIdPedido(e.target.value)}>
                                            <option value="">Selecciona un pedido</option>
                                            {envios.filter((item) => item.estado !== 'Entregado').map((item) => (
                                                <option key={item.codigo} value={item.codigo}>{item.codigo}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="fechaEntrega">
                                        <Form.Label>Nueva Fecha Preferida de Entrega</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={fechaEntrega}
                                            onChange={(e) => setFechaEntrega(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button type="submit" className={`w-100 fw-bold ${estilos.btnPrimario}`}>
                                        Guardar Fecha
                                    </Button>
                                </Form>
                            ) : (
                                <p>
                                    <Link to="/login">Inicia sesión</Link> para ver y modificar tus envíos.
                                </p>
                            )}
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className={`p-4 border-0 rounded-3 h-100 ${estilos.tarjeta}`}>
                            <h4 className={`mb-3 ${estilos.titulo}`}>Consulta de Seguimiento</h4>

                            <div className="input-group my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese Código de Envío (ej: PED-1001)"
                                    value={buscarCodigo}
                                    onChange={(e) => setBuscarCodigo(e.target.value)}
                                />
                                <Button variant="outline-secondary" onClick={consultarEstado}>
                                    Buscar
                                </Button>
                            </div>

                            {mensajeError && (
                                <Alert variant="danger" dismissible onClose={() => setMensajeError('')}>
                                    {mensajeError}
                                </Alert>
                            )}

                            {resultado && (
                                <Alert variant="info" className="mb-0">
                                    <p className="mb-1">
                                        <strong>Pedido:</strong> <span>{resultado.codigo}</span>
                                    </p>
                                    <p className="mb-1">
                                        <strong>Estado:</strong>{' '}
                                        <span className={`text-uppercase ${estilos.estadoSeguimiento}`}>
                                            {resultado.estado}
                                        </span>
                                    </p>
                                    <p className="mb-0">
                                        <strong>Fecha Programada:</strong> <span>{resultado.fechaEntrega}</span>
                                    </p>
                                </Alert>
                            )}
                        </Card>
                    </Col>
                </Row>

                {usuario && (
                    <Row className="mt-4">
                        <Col xs={12}>
                            <Card className={`p-4 border-0 rounded-3 ${estilos.tarjeta}`}>
                                <h4 className={`mb-3 ${estilos.titulo}`}>Mis Envíos</h4>
                                <Table striped responsive className="align-middle mt-2">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Dirección</th>
                                            <th>Fecha Entrega</th>
                                            <th>Estado</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {envios.map((item) => (
                                            <tr key={item.codigo}>
                                                <td>{item.codigo}</td>
                                                <td>{item.direccion}, {item.comuna}</td>
                                                <td>{item.fechaEntrega}</td>
                                                <td>
                                                    <Badge bg="warning" text="dark">{item.estado}</Badge>
                                                </td>
                                                <td>
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        disabled={item.estado === 'Entregado'}
                                                        onClick={() => actualizarEstado(item.codigo)}
                                                    >
                                                        Avanzar Estado
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {envios.length === 0 && <p className="mb-0">Todavía no tienes envíos.</p>}
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>

            <Footer />
        </div>
    );
}

export default Envios;
