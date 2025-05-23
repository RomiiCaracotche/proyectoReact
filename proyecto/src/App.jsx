
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

  function agregarCarrito(producto) {

            //verifico si existe
            const productoExiste = carrito.find(prod => prod.id === producto.id)

            //si el producto existe sumo la cantidad
            if(productoExiste) {
              const carritoActualizado = carrito.map(prod => {
                if(prod.id === producto.id) {
                  const cantidadAct = prod.cantidad + producto.cantidad;
                  const nuevoProd = {...prod, cantidad: cantidadAct}
                  return nuevoProd
                }
                return prod
              })
              setCarrito(carritoActualizado)
            }
            else {
                //si no existe, lo agrego
                setCarrito([...carrito, producto])
            }

          setCarrito([...carrito, producto])
          //si el producto ya se encuentra en el carrito, incremento la cantidad       
           
  }


  return (
    <Router>
        <div className='container'>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/productos" element={<ProductsList />} />
                <Route path="/detalleProducto/:id" element={<DetailProduct agregarCarrito={agregarCarrito} />} />
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
