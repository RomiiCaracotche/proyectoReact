import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductList/ProductsList.jsx';
import DetailProduct from './components/DetailProduct/DetailProduct.jsx';
import Nosotros from './components/Nosotros/Nosotros.jsx';
import Contact from './components/Contact/Contact.jsx';
import Cart from './components/Cart/Cart.jsx';
import Nav from './components/Nav/Nav.jsx';
import Denied from './components/Denied/Denied.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Footer from './components/Footer/Footer.jsx';
import FormProduct from './components/FormProduct/FormProduct.jsx';
import FormEdit from './components/FormEdit/FormEdit.jsx';
import { useAuthContext } from "./contexts/AuthContext";
import { useEffect } from "react";

function App() {
  const {validarLogin} = useAuthContext();

  useEffect(() => {
       validarLogin();
  },[])
  
  return (
    <Router>
        <Nav/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/productos" element={<ProductsList />} />
            <Route path="/detalleProducto/:id" element={<DetailProduct/>} />
            <Route path="/nosotros" element={<Nosotros/>} />
            <Route path="/contacto" element={<Contact/>} />
            <Route path="/denied" element={<Denied/>} />
            <Route path="/carrito" element={<Cart/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/admin/agregarProducto' element={<FormProduct />} />
            <Route path='/admin/editarProducto/:id' element={<FormEdit />} />
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App
