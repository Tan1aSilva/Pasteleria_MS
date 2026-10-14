import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import estilos from './producto_card.module.css';

function ProductoCard({ producto, textoBoton, onClick }) {
    return (
        <Card className={estilos.cardProducto}>
            <div className={estilos.contenedorImagen}>
                <img src={producto.imagen} alt={producto.nombre} className={estilos.imagenCard} />
            </div>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between mb-2">
                    <Badge bg="secondary">{producto.forma}</Badge>
                    <Badge bg="info">{producto.tamano}</Badge>
                </div>
                <Card.Title className="text-purpura fw-bold fs-6">{producto.nombre}</Card.Title>
                <Card.Text className="text-secondary small flex-grow-1">{producto.descripcion}</Card.Text>
                <h5 className="text-purpura fw-bold mt-2">${producto.precio.toLocaleString('es-CL')} CLP</h5>
                <Button className="w-100 mt-2 btn-rosa" onClick={() => onClick(producto)}>
                    {textoBoton}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductoCard;
