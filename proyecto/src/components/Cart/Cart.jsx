import "./Cart.css";
import ItemCart from '../ItemCart/ItemCart.jsx';
import { useState, useEffect } from 'react';

function Cart( {carrito} ){

    const total =  carrito.reduce((total, producto) => total + producto.price * (producto.cantidad ? producto.cantidad : 1), 0) 

    return (
        <div className="carts">
            {carrito.length > 0 ? carrito.map(producto =>
                <li key={producto.id} className="product-li">
                    <ItemCart producto={producto} />
                </li>
            ) :
                <p>carrito vacio</p>
            }

            {total > 0 ? <span>Total a pagar: {total} $</span>: <></>}
        </div>
    )
}

export default Cart;