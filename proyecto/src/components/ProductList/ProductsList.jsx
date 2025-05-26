import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./productsList.css";
import { Navigate } from "react-router-dom";

function ProductsList() {
    const [listaProductos, setListaProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://68100d8c27f2fdac24101f03.mockapi.io/productos")
        .then(resp => resp.json())
        .then(datos => { 
            setListaProductos(datos)
            setCargando(false)
        })
        .catch(error => {
            console.log(e)
            setError("Hubo un error al cargar los productos")
            setCargando(false)
        })
    },[])

    if(cargando) {
        return <p>Cargando productos...</p>
    }
    else if (error){
        return <p>{error}</p>
    } else {
        return (
            <div className="products">
                {listaProductos.map(producto =>
                    <li key={producto.id} className="product-li">
                        <Product producto={producto} />
                    </li>
                )}
            </div>
        );
    }
  
}

export default ProductsList;