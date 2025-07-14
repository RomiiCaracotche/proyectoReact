import { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext';
import { Form, Button, Container } from "react-bootstrap";

function FormProduct() {
    const {agregarProducto} = useProductsContext();
    const {admin, user} = useAuthContext();
    const [mensaje, setMensaje] = useState(false);
    const navegar = useNavigate();
    const [producto, setProducto] = useState({
        name: '',
        price: '',
        description: '',
        imagen: ''
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const validForm = validarFormulario();
    
        if (validForm) {
            agregarProducto(producto)
            .then((data) => {
                setProducto({ name: '', price: '', description: '', imagen: '' });
                 setMensaje(true);
                const timer = setTimeout(() => {
                    setMensaje(false);
                    navegar("/productos");
                }, 2000);
            })
            .catch((error) => Alert("Error al cargar el producto: "+ error))
        } 
        else {
            alert('Error al cargar el producto: '+ validForm);
        }
    };

    const validarFormulario = () => {
        if (!producto.name.trim()) {
            return('El nombre es obligatorio.');
        }
        if (!producto.price || producto.price <= 0) {
            return('El precio debe ser mayor a 0.');
        }
        if (!producto.description.trim() || producto.description.length < 10) {
            return('La descripción debe tener al menos 10 caracteres.');
        }
        if (!producto.imagen.trim()) {
            return('La url de la imagen esta vacía.');
        }
        else {
            return true
        }
    };

    if(user) {
        return <Navigate to="/denied" replace />
    } 
    else {
        if(!admin) {
            return <Navigate to="/login" replace /> 
        }
        else {
            return ( 
                
                <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
                    <Container className='w-50 d-flex flex-column justify-content-center align-items-center mt-5 p-4 rounded border border-secondary' style={{}}>

                        <Form onSubmit={handleSubmit} className='w-100 d-flex flex-column justify-content-center align-items-center'>
                            <Form.Label className='fw-bold fs-4 text-decoration-underline'>Agregar Producto</Form.Label>         
                            
                            <Form.Group className="mb-3 w-100 fw-bold">
                                <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                                <Form.Control id="nombre" placeholder="Nombre del producto" type="text" name="name" value={producto.name} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-100 fw-bold">
                                <Form.Label htmlFor="imagen">URL de la Imagen:</Form.Label>
                                <Form.Control id="imagen" placeholder="Imagen del producto" type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3 w-100 fw-bold">
                                <Form.Label htmlFor="precio">Precio:</Form.Label>
                                <Form.Control id="precio" placeholder="Precio del producto" type="number" name="price" value={producto.price} onChange={handleChange} required min="0" />
                            </Form.Group>

                            <Form.Group className="mb-3 w-100 fw-bold" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Ingrese la descripcion del producto aqui..." rows={3} value={producto.description} onChange={handleChange} required />
                            </Form.Group>

                            <Button variant="primary" type="submit" className='w-100 mt-3 border border-black'>Agregar</Button>
                        </Form>

                    </Container>

                    { mensaje ? 
                            <div className="alert alert-success mt-3 w-50" role="alert">
                                El producto se agrego correctamente!!!
                            </div> 
                            : 
                            <></> 
                    }

                </div>
            );
        }
    }
}

export default FormProduct;