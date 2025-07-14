import { useEffect, useState } from "react";
import { useProductsContext } from "../../contexts/ProductsContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext";
import { Form, Button, Container } from "react-bootstrap";

function FormEdit() {
  const {obtenerProducto, encontrado, editarProducto} = useProductsContext();
  const [producto, setProducto] = useState(encontrado);
  const {id} = useParams();
  const {admin, user} = useAuthContext();
  const [mensaje, setMensaje] = useState(false);
  const navegar = useNavigate();

  useEffect(() => {
    obtenerProducto(id)
            .then(() => { setProducto(encontrado)})
            .catch((error) => {
                if(error == "Producto no encontrado") {
                    setError("Producto no encontrado")
                }
                if(error == "Hubo un error al obtener el producto") {
                    setError("Hubo un error al obtener el producto")
                }
            })
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validForm = validarFormulario();

    if (validForm) {
        editarProducto(producto)
          .then((prod) => {
                setMensaje(true);
                const timer = setTimeout(() => {
                    setMensaje(false);
                    navegar("/productos");
                }, 2000);
          })
        .catch((error) => {
              console.log('Hubo un problema al actualizar el producto.' +error.message);
        })
    }
    else {
            console.log('Error al cargar el producto: '+ validForm);
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
                                <Form.Label className='fw-bold fs-4 text-decoration-underline'>Modificar Producto</Form.Label>         
                                
                                <Form.Group className="mb-3 w-100 fw-bold">
                                    <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                                    <Form.Control id="nombre" type="text" name="name" value={producto.name || ''} onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 fw-bold">
                                    <Form.Label htmlFor="imagen">URL de la Imagen:</Form.Label>
                                    <Form.Control id="imagen" type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 fw-bold">
                                    <Form.Label htmlFor="precio">Precio:</Form.Label>
                                    <Form.Control id="precio" type="number" name="price" value={producto.price || ''} onChange={handleChange} required min="0" />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 fw-bold" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Descripción:</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="description" value={producto.description || ''} onChange={handleChange} required />
                                </Form.Group>

                                <Button variant="warning" type="submit" className='w-100 mt-3 fw-bold border border-black'>Actualizar</Button>
                            </Form>

                        </Container>

                         { mensaje ? 
                            <div className="alert alert-success mt-3 w-50" role="alert">
                                El producto se edito correctamente!!!
                            </div> 
                            : 
                            <></> 
                        }
                </div>
            );
        }
    }
}

export default FormEdit;