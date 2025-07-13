/* import "./ItemCart.css"; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ItemCart( {producto, borrarCarrito} ) {

    function eliminarProducto() {
        borrarCarrito(producto.id)
    }

    return (
        <div className="item-cart">
            <div>
                <img src={producto.imagen} className="item-img" />
            </div>
            <div className="container-title">
                <h2 className="title">{producto.name}</h2>
                <div className="container-cantidad">
                    <p className="price">$ {producto.price}</p>
                    <span>Cantidad: {producto.cantidad}</span>
                    <span>Total: {producto.cantidad ? producto.price * producto.cantidad : producto.price}</span>
                    <button className='button' onClick={eliminarProducto}><FontAwesomeIcon icon={faTrash} size="lg" style={{color: "#fff"}} /></button>
                </div>
            </div>  
        </div>
    );
}

export default ItemCart;