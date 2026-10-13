import { useState } from 'react';
import App_navbar from '../../components/navbar/navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import estilos from './catalogo.module.css';

import { inventario } from './catalogo_productos';

function Catalogo() {
    const [filtroCategoria, setFiltroCategoria] = useState('Todas');
    const [filtroTamano, setFiltroTamano] = useState('Todos');
    const [filtroForma, setFiltroForma] = useState('Todas');
    
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mensajeEspecial, setMensajeEspecial] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);

    // FILTRADO COMBINADO
    const productosFiltrados = inventario.filter((item) => {
        const coincideCategoria = filtroCategoria === 'Todas' || item.categoria === filtroCategoria;
        const coincideTamano = filtroTamano === 'Todos' || item.tamano === filtroTamano;
        const coincideForma = filtroForma === 'Todas' || item.forma === filtroForma;
        return coincideCategoria && coincideTamano && coincideForma;
    });

    function abrirModal(prod) {
        setProductoSeleccionado(prod);
        setMensajeEspecial('');
        setMostrarModal(true);
    }

    function guardarPersonalizacion() {
        alert("Producto " + productoSeleccionado.nombre + " agregado con mensaje: " + (mensajeEspecial || "Sin mensaje"));
        setMostrarModal(false);
    }

    return (
        <>
            <App_navbar />
            <Container className="py-4">
                <h2 className="text-center text-chocolate mb-4 fw-bold">Catalogo de Productos ({productosFiltrados.length})</h2>
                
                {/* PANEL DE FILTROS */}
                <Card className={`p-4 mb-4 shadow-sm ${estilos.tarjetaFiltros}`}>
                    <Row className="g-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-bold text-chocolate">Categorias / Dietas:</Form.Label>
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
                            <Form.Group>
                                <Form.Label className="fw-bold text-chocolate">Tamano:</Form.Label>
                                <Form.Select value={filtroTamano} onChange={(e) => setFiltroTamano(e.target.value)} className={estilos.selectRosa}>
                                    <option value="Todos">Todos los tamanos</option>
                                    <option value="Familiar">Familiar (15+ personas)</option>
                                    <option value="Mediano">Mediano (8-10 personas)</option>
                                    <option value="Individual">Individual</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-bold text-chocolate">Forma de Torta:</Form.Label>
                                <Form.Select value={filtroForma} onChange={(e) => setFiltroForma(e.target.value)} className={estilos.selectRosa}>
                                    <option value="Todas">Todas las formas</option>
                                    <option value="Cuadrada">Cuadradas</option>
                                    <option value="Circular">Circulares</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card>

                {/* GRILLA DE PRODUCTOS */}
                <Row className="g-4">
                    {productosFiltrados.map((item) => (
                        <Col key={item.id} sm={6} lg={3}>
                            <Card className={estilos.cardProducto}>
                                <div className={estilos.contenedorImagen}>
                                    <img src={item.imagen} alt={item.nombre} className={estilos.imagenCard} />
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between mb-2">
                                        <Badge bg="secondary">{item.forma}</Badge>
                                        <Badge bg="info">{item.tamano}</Badge>
                                    </div>
                                    <Card.Title className="text-chocolate fw-bold fs-6">{item.nombre}</Card.Title>
                                    <Card.Text className="text-secondary small flex-grow-1">{item.descripcion}</Card.Text>
                                    <h5 className="text-chocolate fw-bold mt-2">${item.precio.toLocaleString('es-CL')} CLP</h5>
                                    <Button className={`w-100 mt-2 ${estilos.btnRosa}`} onClick={() => abrirModal(item)}>
                                        Personalizar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered size="lg">
                    <Modal.Header closeButton className={estilos.modalHeader}>
                        <Modal.Title className="text-chocolate">Detalles y Personalizacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        {productoSeleccionado?.imagen && (
                            <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className={`img-fluid mb-3 ${estilos.imagenModal}`} />
                        )}
                        <h4 className="text-chocolate fw-bold mb-1">{productoSeleccionado?.nombre}</h4>
                        <p className="text-secondary mb-3">{productoSeleccionado?.descripcion}</p>

                        {productoSeleccionado?.historia && (
                            <Card className="p-3 mb-3 text-start shadow-sm" style={{ backgroundColor: '#FFF5E1', border: '2px solid #FFC0CB' }}>
                                <h6 className="fw-bold text-chocolate mb-1">Historia y Origen de la Receta:</h6>
                                <p className="small text-secondary mb-0" style={{ lineHeight: '1.5' }}>{productoSeleccionado.historia}</p>
                            </Card>
                        )}
                        <hr />
                        <p className="text-chocolate fw-bold mb-2">Escribe el mensaje especial para colocar sobre tu pedido:</p>
                        <Form.Control type="text" placeholder="Ej: Feliz Aniversario" value={mensajeEspecial} onChange={(e) => setMensajeEspecial(e.target.value)} className={estilos.selectRosa} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
                        <Button className={estilos.btnRosa} onClick={guardarPersonalizacion}>Guardar y Agregar</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default Catalogo;