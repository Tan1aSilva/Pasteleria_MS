import { useState } from 'react';
import { Link } from 'react-router-dom';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ProductoCard from '../../components/producto_card/producto_card';
import CompartirRedes from '../../components/compartir_redes/compartir_redes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { agregarAlCarritoDB } from '../../data/db';
import estilos from './catalogo.module.css';

import { inventario } from './catalogo_productos';

function Catalogo() {
    const [busqueda, setBusqueda] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('Todas');
    const [filtroTamano, setFiltroTamano] = useState('Todos');
    const [filtroForma, setFiltroForma] = useState('Todas');

    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mensajeEspecial, setMensajeEspecial] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensajeAgregado, setMensajeAgregado] = useState('');


    const productosFiltrados = inventario.filter((item) => {
        const coincideBusqueda = item.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = filtroCategoria === 'Todas' || item.categoria === filtroCategoria;
        const coincideTamano = filtroTamano === 'Todos' || item.tamano === filtroTamano;
        const coincideForma = filtroForma === 'Todas' || item.forma === filtroForma;
        return coincideBusqueda && coincideCategoria && coincideTamano && coincideForma;
    });

    function abrirModal(prod) {
        setProductoSeleccionado(prod);
        setMensajeEspecial('');
        setCantidad(1);
        setMostrarModal(true);
    }

    function guardarPersonalizacion() {
        agregarAlCarritoDB(productoSeleccionado, cantidad, mensajeEspecial.trim());
        setMensajeAgregado(cantidad + ' x ' + productoSeleccionado.nombre + ' agregado al carrito');
        setMostrarModal(false);
    }

    const esTorta = productoSeleccionado && productoSeleccionado.nombre.includes('Torta');

    return (
        <>
            <App_navbar />
            <Container className="py-4 flex-grow-1">
                <h2 className="text-center text-purpura mb-4 fw-bold">Catalogo de Productos ({productosFiltrados.length})</h2>

                {mensajeAgregado && (
                    <Alert variant="success" dismissible onClose={() => setMensajeAgregado('')}>
                        {mensajeAgregado}. <Link to="/carrito">Ver carrito</Link>
                    </Alert>
                )}

                <Card className={`p-4 mb-4 shadow-sm ${estilos.tarjetaFiltros}`}>
                    <Row className="g-3">
                        <Col md={12}>
                            <Form.Group controlId="busqueda">
                                <Form.Label className="fw-bold text-purpura">Buscar:</Form.Label>
                                <Form.Control type="text" placeholder="Ej: chocolate" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className={estilos.selectRosa} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="filtroCategoria">
                                <Form.Label className="fw-bold text-purpura">Categorias / Dietas:</Form.Label>
                                <Form.Select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className={estilos.selectRosa}>
                                    <option value="Todas">Todas las Categorias</option>
                                    <option value="Productos Sin Gluten">Productos Sin Gluten</option>
                                    <option value="Productos Vegana">Productos Veganos</option>
                                    <option value="Productos Sin Azucar">Productos Sin Azucar</option>
                                    <option value="Tortas Cuadradas">Tortas Cuadradas</option>
                                    <option value="Tortas Circulares">Tortas Circulares</option>
                                    <option value="Postres Individuales">Postres Individuales</option>
                                    <option value="Pasteleria Tradicional">Pasteleria Tradicional</option>
                                    <option value="Tortas Especiales">Tortas Especiales</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="filtroTamano">
                                <Form.Label className="fw-bold text-purpura">Tamano:</Form.Label>
                                <Form.Select value={filtroTamano} onChange={(e) => setFiltroTamano(e.target.value)} className={estilos.selectRosa}>
                                    <option value="Todos">Todos los tamanos</option>
                                    <option value="Familiar">Familiar (15+ personas)</option>
                                    <option value="Mediano">Mediano (8-10 personas)</option>
                                    <option value="Individual">Individual</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="filtroForma">
                                <Form.Label className="fw-bold text-purpura">Forma de Torta:</Form.Label>
                                <Form.Select value={filtroForma} onChange={(e) => setFiltroForma(e.target.value)} className={estilos.selectRosa}>
                                    <option value="Todas">Todas las formas</option>
                                    <option value="Cuadrada">Cuadradas</option>
                                    <option value="Circular">Circulares</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card>

                {productosFiltrados.length === 0 && (
                    <p className="text-center">No se encontraron productos.</p>
                )}

                <Row className="g-4">
                    {productosFiltrados.map((item) => (
                        <Col key={item.id} sm={6} lg={3}>
                            <ProductoCard producto={item} textoBoton="Personalizar" onClick={abrirModal} />
                        </Col>
                    ))}
                </Row>

                <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered size="lg">
                    <Modal.Header closeButton className={estilos.modalHeader}>
                        <Modal.Title className="text-purpura">Personalizar Pedido</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        {productoSeleccionado?.imagen && (
                            <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className={`img-fluid mb-3 ${estilos.imagenModal}`} />
                        )}
                        <h4 className="text-purpura fw-bold mb-1">{productoSeleccionado?.nombre}</h4>
                        <p className="text-secondary mb-3">{productoSeleccionado?.descripcion}</p>

                        {productoSeleccionado?.historia && (
                            <Card className="p-3 mb-3 text-start shadow-sm caja-rosa">
                                <h6 className="fw-bold text-purpura mb-1">Historia y Origen de la Receta:</h6>
                                <p className="small text-secondary mb-0" style={{ lineHeight: '1.5' }}>{productoSeleccionado.historia}</p>
                            </Card>
                        )}

                        <CompartirRedes texto={'Mira esta delicia de Pasteleria Mil Sabores: ' + productoSeleccionado?.nombre} />
                        <hr />

                        {esTorta && (
                            <Form.Group className="mb-3" controlId="mensajeEspecial">
                                <Form.Label className="text-purpura fw-bold">Escribe el mensaje especial para colocar sobre tu torta:</Form.Label>
                                <Form.Control type="text" placeholder="Ej: Feliz Aniversario" maxLength={50} value={mensajeEspecial} onChange={(e) => setMensajeEspecial(e.target.value)} className={estilos.selectRosa} />
                            </Form.Group>
                        )}

                        <Form.Group controlId="cantidad" className="mx-auto" style={{ maxWidth: '150px' }}>
                            <Form.Label className="text-purpura fw-bold">Cantidad:</Form.Label>
                            <Form.Control type="number" min="1" max="10" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value) || 1)} className={estilos.selectRosa} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
                        <Button className="btn-rosa" onClick={guardarPersonalizacion}>Guardar y Agregar</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <Footer />
        </>
    );
}

export default Catalogo;
