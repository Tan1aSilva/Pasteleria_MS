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
        { id: 1, tipo: 'Chocolate', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, desc: 'Capas de ganache intenso y bizcocho húmedo para amantes del cacao.' },
        { id: 2, tipo: 'Chocolate', nombre: 'Mousse de Chocolate', precio: 5000, desc: 'Postre individual suave y esponjoso con chocolate de alta calidad.' },
        { id: 3, tipo: 'Manjar', nombre: 'Torta Circular de Manjar', precio: 42000, desc: 'Rellena con abundante manjar artesanal y nueces picadas.' },
        { id: 4, tipo: 'Manjar', nombre: 'Tarta de Santiago', precio: 6000, desc: 'Receta tradicional gallega a base de almendras seleccionadas.' },
        { id: 5, tipo: 'Frutas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, desc: 'Frutas frescas de estación combinadas con suave crema chantilly.' },
        { id: 6, tipo: 'Frutas', nombre: 'Empanada de Manzana', precio: 3000, desc: 'Pastelito horneado relleno con manzana especiada y canela.' },
        { id: 7, tipo: 'Saludable', nombre: 'Cheesecake Sin Azúcar', precio: 47000, desc: 'Base de galleta ligera y queso crema endulzado naturalmente.' },
        { id: 8, tipo: 'Saludable', nombre: 'Torta Vegana de Chocolate', precio: 50000, desc: 'Preparada sin ingredientes de origen animal manteniendo el sabor auténtico.' }
    ];

    const sugerenciasFiltradas = listaRecomendaciones.filter(item => item.tipo === preferencia);

    return (
        <>
            <App_navbar />

            <main>
                <section id="banner" className="container my-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="banner-container text-center">
                                <img 
                                    src="https://media.scoolinary.app/blog/images/2020/07/tipos-de-cremas-en-pasteler%C3%ADa.jpg" 
                                    className="img-fluid rounded shadow" 
                                    alt="Pastelería Mil Sabores Banner" 
                                />
                            </div>
                        </div>
                    </div>
                </section>

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
                                    Nuestra historia comenzó hace cinco décadas en un pequeño taller artesanal. Cada receta ha sido heredada y perfeccionada a lo largo de generaciones, preservando los sabores auténticos de la repostería chilena.
                                </p>
                                <p className="text-secondary fs-5 mb-0">
                                    En 1995 marcamos un hito histórico al participar en el récord Guinness de la torta más grande, consolidando nuestro compromiso con la excelencia, el amor por la pastelería y el respeto por los ingredientes naturales.
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
                                    Sin Azúcar / Vegano
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
                                                <span className="fw-bold text-chocolate fs-5">\${prod.precio.toLocaleString('es-CL')} CLP</span>
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

                    <section id="comunidad" className="mb-5 py-5">
                        <div className="container px-0">
                            <h2 className="fw-bold text-center mb-4">Noticias y Comunidad Duoc UC</h2>
                            <p className="text-center text-muted mb-5">Conoce las últimas novedades, convenios e iniciativas gastronómicas de la comunidad Duoc UC.</p>
                            
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <Card className="h-100 border-0 shadow-sm d-flex flex-column">
                                        <Card.Img variant="top" src="https://www.duoc.cl/wp-content/uploads/2026/01/IMG_1657-1-450x250.jpg" alt="Enoturismo Casablanca" />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="fw-bold">Convenio para potenciar el enoturismo</Card.Title>
                                            <Card.Text className="text-muted flex-grow-1">
                                                Duoc UC Sede Valparaíso y Viña Casas del Bosque firman un importante convenio para impulsar el desarrollo gastronómico y enoturístico del Valle de Casablanca.
                                            </Card.Text>
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                href="https://www.duoc.cl/?noticia_post_type=duoc-uc-sede-valparaiso-y-vina-casas-del-bosque-firman-convenio-para-potenciar-el-enoturismo-del-valle-de-casablanca" 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="mt-3"
                                            >
                                                Leer más
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div className="col-md-4">
                                    <Card className="h-100 border-0 shadow-sm d-flex flex-column">
                                        <Card.Img variant="top" src="https://www.duoc.cl/wp-content/uploads/2025/12/100-450x250.jpg" alt="Juna Chef Receta" />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="fw-bold">Receta estudiantil en Plan Piloto Junaeb</Card.Title>
                                            <Card.Text className="text-muted flex-grow-1">
                                                Una propuesta gastronómica creada por estudiantes de Duoc UC formará parte del programa piloto "Juna Chef" para enriquecer la alimentación escolar.
                                            </Card.Text>
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                href="https://www.duoc.cl/?noticia_post_type=juna-chef-receta-de-estudiantes-duoc-uc-sera-parte-del-plan-piloto-de-junaeb-para-alimentacion-escolar" 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="mt-3"
                                            >
                                                Leer más
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div className="col-md-4">
                                    <Card className="h-100 border-0 shadow-sm d-flex flex-column">
                                        <Card.Img variant="top" src="https://www.duoc.cl/wp-content/uploads/2025/09/chef-talks-agosto-2025_-450x250.jpg" alt="Chef Talks" />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="fw-bold">ChefTalks: Cocina Territorial</Card.Title>
                                            <Card.Text className="text-muted flex-grow-1">
                                                Destacado chef nacional se reunió con estudiantes y docentes en una jornada de ChefTalks orientada a promover y revalorizar la identidad de la cocina territorial.
                                            </Card.Text>
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                href="https://www.duoc.cl/?noticia_post_type=cheftalks-reunio-a-destacado-chef-nacional-con-estudiantes-y-docentes-para-promover-el-desarrollo-de-la-cocina-territorial" 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="mt-3"
                                            >
                                                Leer más
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                </Container>
            </main>

            <footer className="custom-footer text-white py-4 mt-auto bg-dark">
                <div className="container text-center">
                    <div className="mb-3">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white me-3 fs-5"><i className="fab fa-instagram"></i></a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white me-3 fs-5"><i className="fab fa-facebook"></i></a>
                        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-white fs-5"><i className="fab fa-tiktok"></i></a>
                    </div>
                    <p className="mb-1">2026 Pastelería Mil Sabores. Todos los derechos reservados.</p>
                    <small className="text-white-50">Desarrollo Twice - Duoc UC</small>
                </div>
            </footer>
        </>
    );
}

export default Inicio;