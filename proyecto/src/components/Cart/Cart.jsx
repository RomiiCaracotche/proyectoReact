import "./Cart.css";
import ItemCart from '../ItemCart/ItemCart.jsx';
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

function Cart( {carrito, borrarCarrito, userLogueado, adminLogueado} ){

    const total =  (carrito.reduce((total, producto) => total + producto.price * (producto.cantidad ? producto.cantidad : 1), 0)).toFixed(2) 

    if(!userLogueado && !adminLogueado) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="container-carts">
            {carrito.length > 0 ? carrito.map(producto =>
                <li key={producto.id} className="cart-li">
                    <ItemCart producto={producto} borrarCarrito={borrarCarrito} />
                </li>
            ) :
                <div className="container-empty">
                    <p>El carrito está vacío.</p>
                </div>
            }
            <div className="container-total">
                {total > 0 ? <h3 className="total">Total a pagar: ${total} </h3>: <></>}
            </div>  
        </div>
    )
}

export default Cart;