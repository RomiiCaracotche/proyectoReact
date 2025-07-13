import { useEffect, useState } from "react";
import { useProductsContext } from "../../contexts/ProductsContext";
import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Form, Button, Container } from "react-bootstrap";

function FormEdit() {
  const {obtenerProducto, encontrado, editarProducto} = useProductsContext();
  const [producto, setProducto] = useState(encontrado);
  const {id} = useParams();
  const {admin} = useAuthContext();

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

  if(!admin) {
    return(
      <Navigate to="/login" replace />
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validForm = validarFormulario();
    if (validForm) {
        editarProducto(producto)
          .then((prod) => {
              alert('Producto actualizado correctamente.');
          })
        .catch((error) => {
              alert('Hubo un problema al actualizar el producto.' +error.message);
        })
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

  return (

        <div className='h-75 d-flex flex-column justify-content-center align-items-center'>
                <Container className='w-50 d-flex flex-column justify-content-center align-items-center mt-5 p-4 rounded border border-secondary' style={{}}>

                    <Form onSubmit={handleSubmit} className='w-100 d-flex flex-column justify-content-center align-items-center'>
                        <Form.Label className='fw-bold fs-4 text-decoration-underline'>Modificar Producto</Form.Label>         
                        
                        <Form.Group className="mb-3 w-100 fw-bold">
                            <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                            <Form.Control id="nombre" placeholder="Nombre del producto" type="text" name="name" value={producto.name || ''} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3 w-100 fw-bold">
                            <Form.Label htmlFor="imagen">URL de la Imagen:</Form.Label>
                            <Form.Control id="imagen" placeholder="Imagen del producto" type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3 w-100 fw-bold">
                            <Form.Label htmlFor="precio">Precio:</Form.Label>
                            <Form.Control id="precio" placeholder="Precio del producto" type="number" name="price" value={producto.price || ''} onChange={handleChange} required min="0" />
                        </Form.Group>

                        <Form.Group className="mb-3 w-100 fw-bold" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control as="textarea" placeholder="Ingrese la descripcion del producto aqui..." rows={3} value={producto.description || ''} onChange={handleChange} required />
                        </Form.Group>

                        <Button variant="warning" type="submit" className='w-100 mt-3 fw-bold border border-black'>Actualizar</Button>
                    </Form>

                </Container>
            </div>

  );
}

export default FormEdit;