import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ItemCart( {producto} ) {

    function eliminarProducto() {

    }

    return (
        
        <div className='container-cart'>
                <div className="cart">
                    <h2 className="title">{producto.name}</h2>
                    <img src={producto.imagen} className="card-img" />
                    <p className="price">$ {producto.price}</p>
                    <span>Totalll: {producto.cantidad ? producto.price * producto.cantidad : producto.price}</span>
                    <button className='button' onClick={eliminarProducto}>Eliminar Producto</button>
                </div>
        </div>
    );
}

export default ItemCart;