/* import "./ItemCart.css"; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Card,ListGroup,Button} from "react-bootstrap";

function ItemCart( {producto, borrarCarrito} ) {

    function eliminarProducto() {
        borrarCarrito(producto.id)
    }

    return (

        {/* <Card className='d-flex flex-row'>
            <Card.Img variant="top" style={{ width:'150px', height:'150px', objectFit:'cover' }} src={producto.imagen} />
            <Card.Body>
                <Card.Title>{producto.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Total: {producto.cantidad ? producto.price * producto.cantidad : producto.price}</ListGroup.Item>
                <ListGroup.Item>Precio: {producto.price}</ListGroup.Item>
                <ListGroup.Item>Cantidad: {producto.cantidad}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button onClick={eliminarProducto}><FontAwesomeIcon icon={faTrash} size="lg" style={{color: "#fff"}} /></Button>
            </Card.Body>
        </Card> */}

    );
}

export default ItemCart;