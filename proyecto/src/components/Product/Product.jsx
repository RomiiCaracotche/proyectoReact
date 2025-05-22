import "../Product/Product.css";
import {Link} from 'react-router-dom';
import "../DetailProduct/DetailProduct.jsx";

function Product( {producto} ){
    
    return (
        <div className="card">
            <h2 className="title">{producto.name}</h2>
            <img src={producto.imagen} className="card-img" />
            <p className="price">$ {producto.price}</p>
            <Link to={"/detalleProducto/"+producto.id} className="button">Ver Producto</Link>
        </div>
    );
}

export default Product;