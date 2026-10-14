import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { blogs } from '../../data/blogs';

const CATEGORIAS = ['Todas', 'Recetas', 'Consejos', 'Historia'];

function Blogs() {
    const [categoria, setCategoria] = useState('Todas');

    const blogsFiltrados = blogs.filter((blog) => categoria === 'Todas' || blog.categoria === categoria);

    return (
        <>
            <App_navbar />
            <Container className="my-5 flex-grow-1">
                <h2 className="text-center fw-bold mb-2">Blog Mil Sabores</h2>
                <p className="text-center text-secondary mb-4">Recetas, consejos y noticias de repostería con aportes de estudiantes de Gastronomía Duoc UC.</p>

                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    {CATEGORIAS.map((cat) => (
                        <Button
                            key={cat}
                            className={categoria === cat ? 'btn-borde-rosa activo' : 'btn-borde-rosa'}
                            onClick={() => setCategoria(cat)}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                <Row className="g-4">
                    {blogsFiltrados.map((blog) => (
                        <Col key={blog.id} md={4}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={blog.imagen} alt={blog.titulo} style={{ height: '180px', objectFit: 'cover' }} />
                                <Card.Body className="d-flex flex-column">
                                    <Badge className="badge-rosa align-self-start mb-2">{blog.categoria}</Badge>
                                    <Card.Title className="fw-bold">{blog.titulo}</Card.Title>
                                    <Card.Text className="text-secondary flex-grow-1">{blog.resumen}</Card.Text>
                                    <Link to={'/blogs/' + blog.id} className="btn btn-rosa btn-sm">Leer más</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default Blogs;