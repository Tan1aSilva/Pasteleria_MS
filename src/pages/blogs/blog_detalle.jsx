import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import App_navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import CompartirRedes from '../../components/compartir_redes/compartir_redes';
import { blogs } from '../../data/blogs';

function BlogDetalle() {
    const { id } = useParams();
    const blog = blogs.find((b) => b.id === Number(id));

    return (
        <>
            <App_navbar />
            <Container className="my-5 flex-grow-1" style={{ maxWidth: '800px' }}>
                <Link to="/blogs" className="text-purpura">Volver al blog</Link>

                {!blog ? (
                    <h3 className="text-center mt-4">Artículo no encontrado</h3>
                ) : (
                    <div className="card p-4 mt-3">
                        <h2 className="fw-bold">{blog.titulo}</h2>
                        <p className="text-secondary">{blog.autor} - {blog.fecha}</p>
                        <img src={blog.imagen} alt={blog.titulo} className="img-fluid rounded mb-4" style={{ maxHeight: '350px', objectFit: 'cover' }} />
                        <p className="fs-5">{blog.contenido}</p>
                        <hr />
                        <CompartirRedes texto={'Lee este artículo de Pasteleria Mil Sabores: ' + blog.titulo} />
                    </div>
                )}
            </Container>
            <Footer />
        </>
    );
}

export default BlogDetalle;