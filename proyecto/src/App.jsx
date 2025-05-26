
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";
import ProductsList from './components/ProductList/ProductsList.jsx';
import DetailProduct from './components/DetailProduct/DetailProduct.jsx';
import Nosotros from './components/Nosotros/Nosotros.jsx';
import Contact from './components/Contact/Contact.jsx';
import Cart from './components/Cart/Cart.jsx';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Admin from './components/Admin/Admin.jsx';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [userLogueado, setUserLogueado] = useState(false);
  const [adminLogueado, setAdminLogueado] = useState(false);

  function agregarCarrito(producto, contador) {

            //verifico si existe
            const productoExiste = carrito.find(prod => prod.id === producto.id)

            //si el producto existe sumo la cantidad
            if(productoExiste) {
                const carritoActualizado = carrito.map(prod => {
                    if(prod.id === producto.id) {
                      console.log("tienen la misma clave")
                      console.log("producto sin actualizar: " +JSON.stringify(prod))
                      console.log("cantidad: " +prod.cantidad)
                      console.log("contador: " +JSON.contador)

                      const nuevoProd = {...prod, cantidad: prod.cantidad + contador}
                      console.log("producto actualizado: " +JSON.stringify(nuevoProd))
                      return nuevoProd
                    }
                    return prod
                })

                setCarrito(carritoActualizado)
            }
            else {
                //si no existe, lo agrego
                const prodModif = {...producto, cantidad: contador}
                setCarrito([...carrito, prodModif])
            }          
  }

  function borrarCarrito(id) {
      const nuevoCarrito = carrito.filter(producto => producto.id !== id);
      setCarrito(nuevoCarrito);
  }

  function administrarAdmin() {
    setAdminLogueado(!adminLogueado)
  }

  function administrarUser() {
    setUserLogueado(!userLogueado)
  }


  return (
    <Router>
        <div className='container'>
            <Nav/>
              <Routes className="container-routes" >
                  <Route path="/" element={ <Home/> } />
                  <Route path="/productos" element={ <ProductsList /> } />
                  <Route path="/detalleProducto/:id" element={ <DetailProduct agregarCarrito={agregarCarrito} userLogueado={userLogueado} adminLogueado={adminLogueado} /> } />
                  <Route path="/nosotros" element={ <Nosotros/> } />
                  <Route path="/contacto" element={ <Contact/> } />
                  <Route path="/carrito" element={ <Cart carrito={carrito} userLogueado={userLogueado} adminLogueado={adminLogueado} borrarCarrito={borrarCarrito} /> } />
                  <Route path='/login' element={ <Login adminLogueado={adminLogueado} userLogueado={userLogueado} administrarAdmin={administrarAdmin} administrarUser={administrarUser} /> } />
                  <Route path='/admin' element={adminLogueado ? <Admin /> : <Navigate to="/login" replace/> } />
              </Routes>
        </div>
    </Router>
  )
}

export default App
