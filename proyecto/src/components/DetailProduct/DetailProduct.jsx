import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
/* import "./DetailProduct.css"; */
import Alert from '../Alert/Alert.jsx';
import { Navigate } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext.jsx';
import { useAuthContext } from "./../../contexts/AuthContext.jsx";
import { Link } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import {Card,Container,Button} from "react-bootstrap";

function DetailProduct() {

    const navegar = useNavigate();
    const {user, admin} = useAuthContext();
    const [error, setError] = useState(null);
    const {encontrado, obtenerProducto, eliminarProducto} = useProductsContext();
    const {agregarCarrito} = useContext(CartContext);
    const { id } = useParams();
    const [contador, setContador] = useState(1);
    const [mensaje, setMensaje] = useState(false);

     useEffect(() => {
        obtenerProducto(id)
            .then()
            .catch((error) => {
                if(error == "Producto no encontrado") {
                    setError("Producto no encontrado")
                }
                if(error == "Hubo un error al obtener el producto") {
                    setError("Hubo un error al obtener el producto")
                }
            })
    },[id])

    function modificarCarrito() {
        setMensaje(true);
        agregarCarrito(encontrado, contador)
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

    function disparadorEliminar() {
        eliminarProducto(id)
            .then (() => {
                navegar("/productos")
            })
            .catch ((error) => {
                alert("hubo un problema al eliminar el producto!");
            })
    }

    if(!user && !admin) {
        console.log("no soy nada")
        return <Navigate to="/login" replace />
    }
    else {
        return (

            <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
                {encontrado && (
                    
                            <Card className="text-center">
                                <Card.Header className='fs-4 fw-bold'>Detalle del Producto</Card.Header>
                                <Card.Img variant="top" src={encontrado.imagen} style={{ height:'200px', objectFit:'cover' }}/>
                                <Card.Body>
                                    <Card.Title className='fw-bold'>{encontrado.name}</Card.Title>
                                    <Card.Text className='fw-bold'>${encontrado.price}</Card.Text>
                                    <Card.Text>${encontrado.description}</Card.Text>
                                    <div className='counter'>
                                            <span className='me-3 fw-bold'>Cantidad:</span>
                                            <Button variant="secondary" onClick={restarContador} className='button-contador'> - </Button>
                                            <span className='p-3 fw-bold'>{contador}</span>
                                            <Button variant="secondary" onClick={sumarContador} className='button-contador'> + </Button>
                                    </div>
                                    
                                    { admin ? 
                                        <div className='my-4'>
                                            <Button className='me-2'><Link to={"/admin/editarProducto/" +id} className='text-white text-decoration-none fw-bold'>Editar producto</Link></Button>
                                            <Button variant="danger" onClick={disparadorEliminar} className='fw-bold'>Eliminar producto</Button>
                                        </div>
                                        :
                                        <Button onClick={modificarCarrito}>Agregar al Carrito</Button> 
                                    }
                                   
                                </Card.Body>
                                <Card.Footer className="bg-secondary fw-bold text-light"><span className='me-2'>TOTAL: </span><span>${(encontrado.price * contador).toFixed(2)}</span></Card.Footer>
                            </Card>      
                        
                )}
                <ToastContainer/> 
                { mensaje ? toast.success("Se agrego correctamente el producto !!!") : <></> }
             </div>
        );
    }

}

export default DetailProduct;