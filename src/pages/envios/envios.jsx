import { useState } from 'react';
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
import estilos from './envios.module.css';

const ESTADOS = ['Preparando', 'En Camino', 'Entregado'];

function Envios() {
    const [envios, setEnvios] = useState([
        { codigo: 'ENV-001', pedido: 'PED-1001', direccion: 'Calle 1 45', fecha: '2026-09-10', estado: 'En Camino' }
    ]);

    
    const [idPedido, setIdPedido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');

    
    const [buscarCodigo, setBuscarCodigo] = useState('');
    const [resultado, setResultado] = useState(null);
    const [mensajeError, setMensajeError] = useState('');

    function generarCodigo() {
        let codigo;
        do {
            codigo = 'ENV-' + Math.floor(100 + Math.random() * 900);
        } while (envios.some((e) => e.codigo === codigo));
        return codigo;
    }

    function crearEnvio(e) {
        e.preventDefault();

        const nuevoEnvio = {
            codigo: generarCodigo(),
            pedido: idPedido,
            direccion: direccion,
            fecha: fechaEntrega,
            estado: 'Preparando'
        };

        setEnvios([...envios, nuevoEnvio]);
        setIdPedido('');
        setDireccion('');
        setFechaEntrega('');
    }

    function actualizarEstado(codigo) {
        setEnvios(
            envios.map((item) => {
                if (item.codigo !== codigo) return item;
                const actual = ESTADOS.indexOf(item.estado);
                if (actual < ESTADOS.length - 1) {
                    return { ...item, estado: ESTADOS[actual + 1] };
                }
                return item;
            })
        );
    }

    function consultarEstado() {
        const encontrado = envios.find((e) => e.codigo === buscarCodigo.trim());

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

                <Row className="g-4">
                    <Col md={6}>
                        <Card className={`p-4 border-0 rounded-3 ${estilos.tarjeta}`}>
                            <h4 className={`mb-3 ${estilos.titulo}`}>Programar Entrega</h4>
                            <Form onSubmit={crearEnvio}>
                                <Form.Group className="mb-3" controlId="idPedido">
                                    <Form.Label>ID del Pedido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: PED-1002"
                                        value={idPedido}
                                        onChange={(e) => setIdPedido(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="direccion">
                                    <Form.Label>Dirección de Destino</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Av. Principal 123"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="fechaEntrega">
                                    <Form.Label>Fecha Preferida de Entrega</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fechaEntrega}
                                        onChange={(e) => setFechaEntrega(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button type="submit" className={`w-100 fw-bold ${estilos.btnPrimario}`}>
                                    Crear Envío
                                </Button>
                            </Form>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className={`p-4 border-0 rounded-3 ${estilos.tarjeta}`}>
                            <h4 className={`mb-3 ${estilos.titulo}`}>Consulta de Seguimiento</h4>

                            <div className="input-group my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese Código de Envío"
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
                                        <strong>Pedido:</strong> <span>{resultado.pedido}</span>
                                    </p>
                                    <p className="mb-1">
                                        <strong>Estado:</strong>{' '}
                                        <span className={`text-uppercase ${estilos.estadoSeguimiento}`}>
                                            {resultado.estado}
                                        </span>
                                    </p>
                                    <p className="mb-0">
                                        <strong>Fecha Programada:</strong> <span>{resultado.fecha}</span>
                                    </p>
                                </Alert>
                            )}
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col xs={12}>
                        <Card className={`p-4 border-0 rounded-3 ${estilos.tarjeta}`}>
                            <h4 className={`mb-3 ${estilos.titulo}`}>Lista de Envíos Activos</h4>
                            <Table striped responsive className="align-middle mt-2">
                                <thead>
                                    <tr>
                                        <th>Código Envío</th>
                                        <th>ID Pedido</th>
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
                                            <td>{item.pedido}</td>
                                            <td>{item.direccion}</td>
                                            <td>{item.fecha}</td>
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
                        </Card>
                    </Col>
                </Row>
            </Container>

            
        </div>
    );
}

export default Envios;