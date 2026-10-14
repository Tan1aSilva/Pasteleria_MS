import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

function Nosotros() {
    return (
        <>
            <App_navbar />
            <Container className="my-5 flex-grow-1">
                <h2 className="text-center fw-bold mb-4">Nosotros</h2>

                <Card className="p-4 mb-4">
                    <h4>Nuestra Historia</h4>
                    <p className="mb-0">
                        Pastelería Mil Sabores celebra su 50 aniversario como un referente en la repostería chilena. Somos famosos por nuestra participación en un récord Guinness en 1995, cuando colaboramos en la creación de la torta más grande del mundo. Hoy renovamos nuestro sistema de ventas online para ofrecer una experiencia de compra moderna y accesible.
                    </p>
                </Card>

                <Row className="g-4 mb-4">
                    <Col md={6}>
                        <div className="caja-rosa h-100 p-4">
                            <h4>Misión</h4>
                            <p className="mb-0">
                                Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="caja-rosa h-100 p-4">
                            <h4>Visión</h4>
                            <p className="mb-0">
                                Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos talentos en gastronomía.
                            </p>
                        </div>
                    </Col>
                </Row>

                <div className="text-center">
                    <Link to="/catalogo" className="btn btn-rosa">Ver nuestros productos</Link>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Nosotros;
