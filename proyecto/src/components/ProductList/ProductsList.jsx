import { useEffect, useState } from "react";
import Product from "../Product/Product";
/* import "./productsList.css"; */
import { useProductsContext } from "./../../contexts/ProductsContext.jsx";
import { Container, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

function ProductsList() {

    const [busqueda, setBusqueda] = useState("");
    const { productos, obtenerProductos, filtrarProductos } = useProductsContext();
    const [error, setError] = useState(null);

    //Paginacion
    const productosPorPagina = 12;
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

    useEffect(() => {
        obtenerProductos()
            .then(productos => { })
            .catch((error) => {
                setError("Hubo un problema al cargar los productos")
            })
    }, [])

    useEffect(() => {
        filtrarProductos(busqueda);
    }, [busqueda])

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (error) {
        return <p>{error}</p>
    }
    else {
        return (

            <Container fluid className="d-flex flex-column justify-content-between align-items-center p-4">

                <Row className="w-100 d-flex justify-content-center">
                    <Col xs={12} sm={10} lg={6} xl={4}>
                    <InputGroup className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Buscar producto..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            aria-label="Ingrese el producto que desea buscar aqui" 
                        />
                        <InputGroup.Text id="basic-addon1"><FaSearch/></InputGroup.Text>
                    </InputGroup>
                    </Col>
                </Row>

                <Row className="w-100 d-flex justify-content-center g-4">
                        {(productosActuales.length > 0) ?
                            productosActuales.map(producto =>
                                <Col xs={12} sm={10} lg={6} xl={3}>
                                    <Product producto={producto} />
                                </Col>
                            )
                            :
                            <></>
                        }
                </Row>

                <div className="my-4">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => cambiarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </Container> 
        )    
    }
}

export default ProductsList;