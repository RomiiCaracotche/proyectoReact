import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext';
import { Form, Button, Container } from "react-bootstrap";

function FormProduct() {
    const {agregarProducto} = useProductsContext();
    const {admin} = useAuthContext();
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
        console.log("estoy en el handle del form")
        if (validForm) {
            agregarProducto(producto)
            .then((data) => {
                setProducto({ name: '', price: '', description: '', imagen: '' });
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

    if (!admin) {
        console.log("admin" +admin)
        return <Navigate to="/denied" replace /> 
    } 
    else {
        return ( 
            <div className='h-75 d-flex flex-column justify-content-center align-items-center'>
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
                            <Form.Control as="textarea" placeholder="Ingrese la descripcion del producto aqui..." rows={3} value={producto.description} onChange={handleChange} required />
                        </Form.Group>

                        <Button variant="primary" type="submit" className='w-100 mt-3 border border-black'>Agregar</Button>
                    </Form>

                </Container>
            </div>

          /*   <form onSubmit={handleSubmit}>
                <h2>Agregar Producto</h2>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" value={producto.name} onChange={handleChange} required/>
                </div>
                <div>
                    <label>URL de la Imagen:</label>
                    <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Precio:</label>
                    <input type="number" name="price" value={producto.price} onChange={handleChange} required min="0"/>
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea name="description" value={producto.description} onChange={handleChange} required />
                </div>
                <button type="submit">Agregar Producto</button>
            </form> */
        );
    }

}

export default FormProduct;