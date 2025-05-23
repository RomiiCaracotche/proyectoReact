import { useParams } from 'react-router-dom';
import "./DetailProduct.css";
import { useState, useEffect } from 'react';

function DetailProduct( {agregarCarrito} ) {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [contador, setContador] = useState(1);

     useEffect(() => {
        fetch("https://68100d8c27f2fdac24101f03.mockapi.io/productos/"+id)
        .then(resp => resp.json())
        .then(dato => { (dato) ? setProducto(dato) : setError("vacio") })
        .catch(e => console.log(e))
    },[id])

    function modificarCarrito() {
        agregarCarrito(producto)
    }

    function restarContador() {
        if(contador > 1) setContador(contador - 1)
    }

    function sumarContador() {
        setContador(contador + 1)
    }


    return (
        
        <div className='container-detail'>
            {producto && (
                <div className="card">
                    <h2 className="title">{producto.name}</h2>
                    <img src={producto.imagen} className="card-img" />
                    <p className="price">$ {producto.price}</p>
                    <p className="description">{producto.description}</p>
                    <p>{producto.id}</p>
                    <div className='counter'>
                        <button onClick={restarContador}>-</button>
                        <span>{contador}</span>
                        <button onClick={sumarContador}>+</button>
                    </div>
                    total: {producto.price * contador}
                    <button className='button' onClick={modificarCarrito}>Agregar al Carrito</button>
                </div>)}
        </div>
    );
}

export default DetailProduct;