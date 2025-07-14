import { createContext, useState, useContext } from 'react';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {

    const [productos, setProductos] = useState([]);
    const [productosSinFiltros, setProductosSinFiltros] = useState([]);
    const [encontrado, setEncontrado] = useState(null);

    function obtenerProductos() {
        return(
            new Promise((res, rej) => {
                fetch("https://68100d8c27f2fdac24101f03.mockapi.io/productos")
                .then(resp => resp.json())
                .then(datos => { 
                    setProductos(datos)
                    setProductosSinFiltros(datos)
                    res(datos)
                })
                .catch(error => {
                    rej(error)
                })
            })
        )
    }

    const agregarProducto = async (producto) => {
        return(
            new Promise( async(res, rej) => {
                try {
                        const respuesta = await fetch('https://68100d8c27f2fdac24101f03.mockapi.io/productos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                        });
                        if (!respuesta.ok) {
                        throw new Error('Error al agregar el producto.');
                        }
                        const data = await respuesta.json();
                        res(data);
                        
                    } catch (error) {
                        console.error(error.message);
                        rej('Hubo un problema al agregar el producto.');
                    }
            })
        )
    };

    function obtenerProducto(id) {
        return(
            new Promise((res, rej) => {
                fetch("https://68100d8c27f2fdac24101f03.mockapi.io/productos/"+id)
                    .then(resp => resp.json())
                    .then(dato => { (dato) ? setEncontrado(dato) : rej("Producto no encontrado") })
                    .catch(e => rej("Hubo un error al obtener el producto"))
            })
        )
    }

    function editarProducto(producto) {
        return (
            new Promise(async(res, rej) => {
                try {
                    const respuesta = await fetch("https://68100d8c27f2fdac24101f03.mockapi.io/productos/"+producto.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                    });
                    if (!respuesta.ok) {
                        throw new Error('Error al actualizar el producto.');
                    }
                    const data = await respuesta.json();
                    res(data);  
                } catch (error) {
                    console.error(error.message);
                    rej(error)
                }
            })
        )
    }

    const eliminarProducto = (id) => {
        const confirmar = window.confirm("Estas seguro de eliminar el producto?");
        if(confirmar) {
            return (
                new Promise(async(res, rej) => {
                try {
                    const respuesta = await fetch("https://68100d8c27f2fdac24101f03.mockapi.io/productos/"+id, {
                    method: 'DELETE'
                    });
                    if (!respuesta.ok) {
                        throw new Error('Error al eliminar el producto.');
                    }
                    alert("Producto eliminado correctamente!");
                    res() 
                } catch (error) {
                    console.error(error.message);
                    alert("hubo un problema al eliminar el producto!");
                    rej(error)
                }
            })
            )
        }     
    }

    const filtrarProductos = (filtro) => {
        if(filtro.length < 0) {
            setProductos(productosSinFiltros);
            return
        }

        const productosFiltrados = productosSinFiltros.filter((producto) => producto.name.toLowerCase().includes(filtro.toLowerCase()) );
        setProductos(productosFiltrados)
    }

    return (
        <ProductsContext.Provider value={{ obtenerProductos, productos, agregarProducto, obtenerProducto, encontrado, editarProducto, eliminarProducto, filtrarProductos }}>
            {children}
        </ProductsContext.Provider> 
    );
}
export const useProductsContext = () => useContext(ProductsContext);