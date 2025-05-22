import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./productsList.css";

function ProductsList() {
    const [listaProductos, setListaProductos] = useState([]);

    useEffect(() => {
        fetch("https://68100d8c27f2fdac24101f03.mockapi.io/productos")
        .then(resp => resp.json())
        .then(datos => setListaProductos(datos))
        .catch(e => console.log(e))
    },[])

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

export default ProductsList;