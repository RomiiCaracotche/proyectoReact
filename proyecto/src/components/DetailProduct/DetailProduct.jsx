import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./DetailProduct.css";
import Alert from '../Alert/Alert.jsx';
import { Navigate } from "react-router-dom";


function DetailProduct( {agregarCarrito, userLogueado, adminLogueado} ) {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [contador, setContador] = useState(1);
    const [mensaje, setMensaje] = useState(false);

     useEffect(() => {
        fetch("https://68100d8c27f2fdac24101f03.mockapi.io/productos/"+id)
        .then(resp => resp.json())
        .then(dato => { (dato) ? setProducto(dato) : setError("vacio") })
        .catch(e => console.log(e))
    },[id])

    function modificarCarrito() {
        setMensaje(true);
        agregarCarrito(producto, contador)
        const timer = setTimeout(() => {
            setMensaje(false);
        }, 2000);
    }

    function restarContador() {
        if(contador > 1) setContador(contador - 1)
    }

    function sumarContador() {
        setContador(contador + 1)
    }

    if(!userLogueado && !adminLogueado) {
        return <Navigate to="/login" replace />
    }


    return (
        
        <div className='container-detail'>
            {producto && (
                <div className="card">
                    <h2 className="title">{producto.name}</h2>
                    <img src={producto.imagen} className="card-img" />
                    <p className="price">$ {producto.price}</p>
                    <p className="description">{producto.description}</p>
                    <div className='content-counter'>
                        <div className='counter'>
                            <span className='cantidad'>Cantidad:</span>
                            <button onClick={restarContador} className='button-contador'>-</button>
                            <span>{contador}</span>
                            <button onClick={sumarContador} className='button-contador'>+</button>
                        </div>
                        <span className='total'>Total: ${(producto.price * contador).toFixed(2)}</span>
                    </div> 
                    <button className='button' onClick={modificarCarrito}>Agregar al Carrito</button>
                </div>)}

            { mensaje ? <Alert alerta= {"Se agrego correctamente el producto !!!"} /> : <></> }

        </div>
    );
}

export default DetailProduct;