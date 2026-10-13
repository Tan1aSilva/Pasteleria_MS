import { useState } from 'react';
import App_navbar from '../../components/navbar/navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import estilos from './inicio.module.css';

function Inicio() {
    const navigate = useNavigate();
    const [preferencia, setPreferencia] = useState('Chocolate');

    const listaRecomendaciones = [
        { id: 1, tipo: 'Chocolate', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, desc: 'Capas de ganache intenso y bizcocho humedo para amantes del cacao.' },
        { id: 2, tipo: 'Chocolate', nombre: 'Mousse de Chocolate', precio: 5000, desc: 'Postre individual suave y esponjoso con chocolate de alta calidad.' },
        { id: 3, tipo: 'Manjar', nombre: 'Torta Circular de Manjar', precio: 42000, desc: 'Rellena con abundante manjar artesanal y nueces picadas.' },
        { id: 4, tipo: 'Manjar', nombre: 'Tarta de Santiago', precio: 6000, desc: 'Receta tradicional gallega a base de almendras seleccionadas.' },
        { id: 5, tipo: 'Frutas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, desc: 'Frutas frescas de estacion combinadas con suave crema chantilly.' },
        { id: 6, tipo: 'Frutas', nombre: 'Empanada de Manzana', precio: 3000, desc: 'Pastelito horneado relleno con manzana especiada y canela.' },
        { id: 7, tipo: 'Saludable', nombre: 'Cheesecake Sin Azucar', precio: 47000, desc: 'Base de galleta ligera y queso crema endulzado naturalmente.' },
        { id: 8, tipo: 'Saludable', nombre: 'Torta Vegana de Chocolate', precio: 50000, desc: 'Preparada sin ingredientes de origen animal manteniendo el sabor autentico.' }
    ];

    const sugerenciasFiltradas = listaRecomendaciones.filter(item => item.tipo === preferencia);

    return (
        <>
            <App_navbar />
            <Container className="py-4">
                <section className={`mb-5 text-center p-4 rounded shadow-sm ${estilos.seccionHero}`}>
                    <h1 className={estilos.tituloPrincipal}>Pastelería Mil Sabores</h1>
                    <p className="fs-5 text-secondary mb-3">
                        Celebrando 50 años de tradición repostera con las mejores recetas artesanales de Chile.
                    </p>
                    <Button className={estilos.btnRosa} onClick={() => navigate('/catalogo')}>
                        Ver Catálogo Completo
                    </Button>
                </section>

                <section className="mb-5 p-4 bg-white rounded shadow-sm border">
                    <h2 className={estilos.tituloSeccion}>Origen de Nuestras Recetas Tradicionales</h2>
                    <Row className="align-items-center g-4">
                        <Col md={8}>
                            <p className="text-secondary fs-5">
                                Nuestra historia comenzo hace cinco decadas en un pequeno taller artesanal. Cada receta ha sido heredada y perfeccionada a lo largo de generaciones, preservando los sabores autenticos de la reposteria chilena.
                            </p>
                            <p className="text-secondary fs-5 mb-0">
                                En 1995 marcamos un hito historico al participar en el record Guinness de la torta mas grande, consolidando nuestro compromiso con la excelencia, el amor por la pasteleria y el respeto por los ingredientes naturales.
                            </p>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className={`p-3 rounded ${estilos.cajaTradicion}`}>
                                <h3 className="fw-bold mb-1">50 Años</h3>
                                <p className="mb-0 fw-bold">De Tradición y Calidad</p>
                            </div>
                        </Col>
                    </Row>
                </section>

                <section className="mb-5 p-4 bg-white rounded shadow-sm border">
                    <h2 className={estilos.tituloSeccion}>Recomendaciones Personalizadas para Ti</h2>
                    <p className="text-secondary mb-3">
                        Selecciona tus preferencias o ingredientes favoritos para descubrir sugerencias adaptadas a tus gustos:
                    </p>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold text-chocolate">Elige tu preferencia:</Form.Label>
                        <div className="d-flex flex-wrap gap-2">
                            <Button
                                className={preferencia === 'Chocolate' ? estilos.btnActivo : estilos.btnInactivo}
                                onClick={() => setPreferencia('Chocolate')}
                            >
                                Chocolate Intenso
                            </Button>
                            <Button
                                className={preferencia === 'Manjar' ? estilos.btnActivo : estilos.btnInactivo}
                                onClick={() => setPreferencia('Manjar')}
                            >
                                Manjar y Tradicional
                            </Button>
                            <Button
                                className={preferencia === 'Frutas' ? estilos.btnActivo : estilos.btnInactivo}
                                onClick={() => setPreferencia('Frutas')}
                            >
                                Frutas y Frescura
                            </Button>
                            <Button
                                className={preferencia === 'Saludable' ? estilos.btnActivo : estilos.btnInactivo}
                                onClick={() => setPreferencia('Saludable')}
                            >
                                Sin Azucar / Vegano
                            </Button>
                        </div>
                    </Form.Group>

                    <Row className="g-3">
                        {sugerenciasFiltradas.map((prod) => (
                            <Col key={prod.id} md={6}>
                                <Card className="h-100 border-rosa shadow-sm">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <Card.Title className="text-chocolate fw-bold mb-0">{prod.nombre}</Card.Title>
                                            <Badge bg="success">Recomendado</Badge>
                                        </div>
                                        <Card.Text className="text-secondary small">{prod.desc}</Card.Text>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span className="fw-bold text-chocolate fs-5">${prod.precio.toLocaleString('es-CL')} CLP</span>
                                            <Button className={estilos.btnRosa} size="sm" onClick={() => navigate('/catalogo')}>
                                                Pedir Ahora
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                <section className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#FFF5E1', border: '2px solid #8B4513' }}>
                    <h2 className={estilos.tituloSeccion}>Seccion de Impacto Comunitario</h2>
                    <p className="text-secondary fs-5 mb-3">
                        Cada vez que disfrutas de nuestros productos, contribuyes directamente al desarrollo de nuestra comunidad.
                    </p>
                    <Row className="g-3 justify-content-center text-start mt-2">
                        <Col md={5}>
                            <Card className="h-100 border-0 shadow-sm p-2">
                                <Card.Body>
                                    <h5 className="text-chocolate fw-bold">Apoyo Estudiantil</h5>
                                    <p className="text-secondary small mb-0">
                                        Financiamos becas de practica profesional e insumos de cocina para estudiantes de la carrera de Gastronomia de Duoc UC.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={5}>
                            <Card className="h-100 border-0 shadow-sm p-2">
                                <Card.Body>
                                    <h5 className="text-chocolate fw-bold">Proveedores Locales</h5>
                                    <p className="text-secondary small mb-0">
                                        Compramos materias primas frescas a pequenos agricultores y productores locales de la zona.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Container>
        </>
    );
}

export default Inicio;