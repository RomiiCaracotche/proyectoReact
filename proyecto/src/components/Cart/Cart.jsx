/* import "./Cart.css"; */
import { useContext } from 'react';
import { Navigate, UNSAFE_useFogOFWarDiscovery } from "react-router-dom";
import {CartContext} from "./../../contexts/CartContext.jsx";
import { useAuthContext } from "./../../contexts/AuthContext.jsx";
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Cart(){

    const {carrito, borrarCarrito} = useContext(CartContext);
    const {user} = useAuthContext();
    const total =  (carrito.reduce((total, producto) => total + producto.price * (producto.cantidad ? producto.cantidad : 1), 0)).toFixed(2) 


    const eliminarProducto = (id) => {
            borrarCarrito(id);
    };

    if(!user) {
        return <Navigate to="/login" replace />
    }

    return (

            <Table striped bordered hover className='h-100'>
                <thead className='border border-black text-center'>
                    <tr>
                        <th style={{width:'150px'}}>Imagen</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
               
                <tbody className='fw-bold text-center align-middle'>
                        {carrito.length > 0 ? 
                            carrito.map(producto => 
                                <tr style={{height:'150px'}}>
                                    <td><img src={producto.imagen} style={{width:'150px', height:'150px', objectFit:'cover'}}/></td>
                                    <td>{producto.name}</td>
                                    <td>{producto.cantidad}</td>
                                    <td>${producto.price}</td>
                                    <td>$ {producto.cantidad ? producto.price * producto.cantidad : producto.price}</td>
                                    <td><Button variant="danger" onClick={() => eliminarProducto(producto.id)}><FontAwesomeIcon icon={faTrash} size="lg" style={{color: "#fff"}}/></Button></td>
                                </tr>   
                            ) 
                            :
                            <tr>
                                <td colSpan={6} className='fs-5 fw-bold' >El carrito está vacío.</td>
                            </tr>
                        }
                        <tr>
                            <td colSpan={6} className='border border-black position-relative'>{total > 0 ? <p className="fs-5 fw-bold m-0 p-1 position-absolute bottom-0 end-0">Total: <span className="fs-4 mx-2 fw-bold">${total}</span></p> : <></>}</td>
                        </tr>
                </tbody>
            </Table>
    )
}

export default Cart;