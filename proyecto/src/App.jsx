
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import ProductsList from './components/ProductList/ProductsList.jsx';
import DetailProduct from './components/DetailProduct/DetailProduct.jsx';
import Nosotros from './components/Nosotros/Nosotros.jsx';
import Contact from './components/Contact/Contact.jsx';
import Cart from './components/Cart/Cart.jsx';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './components/Home/Home.jsx';

function App() {
  const [carrito, setCarrito] = useState([]);

  function agregarCarrito(producto, cantidad) {
    
        //si el carrito esta vacio agrego el producto directo
        if(carrito.length === 0) {

            setCarrito(carrito.push({producto: producto, cantidad: cantidad}))
        }
        else {  //si el carrito tiene algo compruebo que exista el producto

            //
            //ACA YA ME CONVIERTE EL CARRITO EN UN ENTERO
            //

            const productoExiste = carrito.find(item => item.producto.id === producto.id)
            //si el producto existe sumo la cantidad
            if(productoExiste) {
              const carritoActualizado = carrito.map(item => {
                if(item.producto.id === producto.id) {
                  //const actualizarCantidad = item.cantidad + cantidad;
                  const nuevoProd = {producto: item.producto, cantidad: item.cantidad + cantidad}
                  return nuevoProd
                }
                return item
              })
              setCarrito(carritoActualizado)
            }
            else {
                //lo agrego porque no esta
                setCarrito(carrito.push({producto: producto, cantidad: cantidad}))
            }
        }    
  }


  return (
    <Router>
        <div className='container'>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/productos" element={<ProductsList />} />
                <Route path="/detalleProducto/:id" element={<DetailProduct carrito={carrito} agregarCarrito={agregarCarrito} />} />
                <Route path="/nosotros" element={<Nosotros/>} />
                <Route path="/contacto" element={<Contact/>} />
                <Route path="/carrito" element={<Cart carrito={carrito} />} />
            </Routes>
            <Footer/>
        </div>
    </Router>
  )
}

export default App
