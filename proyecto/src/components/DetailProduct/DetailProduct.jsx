/* import "./DetailProduct.css"; */
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext.jsx';
import { useAuthContext } from "./../../contexts/AuthContext.jsx";
import { Link } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext.jsx';
import {Card, Button, Modal} from "react-bootstrap";

function DetailProduct() {

    const navegar = useNavigate();
    const {user, admin} = useAuthContext();
    const [error, setError] = useState(null);
    const {encontrado, obtenerProducto, eliminarProducto} = useProductsContext();
    const {agregarCarrito} = useContext(CartContext);
    const {id} = useParams();
    const [contador, setContador] = useState(1);
    const [mensaje, setMensaje] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    const handleShow  = () => {
        setShowModal(true);
    }

    const handleClose = () => setShowModal(false);

    function disparadorEliminar() {
        eliminarProducto(id)
            .then (() => {
                setEliminar(true);
                const timer = setTimeout(() => {
                    setEliminar(false);
                    navegar("/productos")
                }, 2000);
            })
            .catch ((error) => {
                console.log("hubo un problema al eliminar el producto!");
            })
    }

    if(!user && !admin) {
        return <Navigate to="/login" replace />
    }
    else {
        return (

            <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
                
                {encontrado && (
                    <>
                            <Card className="text-center w-50">
                                <Card.Header className='fs-4 fw-bold'>Detalle del Producto</Card.Header>
                                <Card.Img variant="top" src={encontrado.imagen} style={{ height:'200px', objectFit:'cover' }}/>
                                <Card.Body>
                                    <Card.Title className='fw-bold'>{encontrado.name}</Card.Title>
                                    <Card.Text className='fw-bold'>${encontrado.price}</Card.Text>
                                    <Card.Text>{encontrado.description}</Card.Text>
                                    { user ? 
                                        <div className='counter my-2'>
                                                <span className='me-3 fw-bold'>Cantidad:</span>
                                                <Button variant="secondary" onClick={restarContador} className='button-contador'> - </Button>
                                                <span className='p-3 fw-bold'>{contador}</span>
                                                <Button variant="secondary" onClick={sumarContador} className='button-contador'> + </Button>
                                        </div>
                                        :
                                        <></>
                                    }
                                    { admin ? 
                                        <div className='my-4'>
                                            <Button className='me-2'><Link to={"/admin/editarProducto/" +id} className='text-white text-decoration-none fw-bold'>Editar producto</Link></Button>
                                            <Button variant="danger" onClick={handleShow} className='fw-bold'>Eliminar producto</Button>
                                        </div>
                                        :
                                        <Button className='fw-bold my-3 w-50' onClick={modificarCarrito}>Agregar al Carrito</Button> 
                                    }
                                   
                                </Card.Body>
                                <Card.Footer className="bg-secondary fw-bold text-light"><span className='me-2'>TOTAL: </span><span>${(encontrado.price * contador).toFixed(2)}</span></Card.Footer>
                            </Card>     
                            
                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Eliminar Producto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>¿Desea eliminar el producto?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button variant="danger" onClick={disparadorEliminar}>
                                    Eliminar
                                </Button>
                                </Modal.Footer>
                            </Modal>


                    </>
                )}

                { mensaje ? 
                        <div className="alert alert-success mt-3 w-50" role="alert">
                            El producto se agrego correctamente al carrito !!!
                        </div> 
                    : 
                        <></> 
                }
                { eliminar ? 
                        <div className="alert alert-success mt-3 w-50" role="alert">
                            El producto se elimino correctamente !!!
                        </div> 
                    : 
                        <></> 
                }

            </div>
        );
    }
}

export default DetailProduct;