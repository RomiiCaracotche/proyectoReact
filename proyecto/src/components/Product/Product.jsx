/* import "../Product/Product.css"; */
import {Link} from 'react-router-dom';
import "../DetailProduct/DetailProduct.jsx";
import Button from "react-bootstrap/Button";
import {Card} from "react-bootstrap";

function Product( {producto} ) {

        return (

            <Card style={{ width:'18rem' }}>
                <Card.Img variant="top" src={producto.imagen} style={{ height:'200px', objectFit:'cover' }}/>
                <Card.Body className='d-flex flex-column align-items-center'>
                    <Card.Title>{producto.name}</Card.Title>
                    <Button variant="primary"><Link to={"/detalleProducto/"+producto.id} className='text-light text-decoration-none'>Ver Detalle</Link></Button>
                </Card.Body>
            </Card>
  );


}

export default Product;