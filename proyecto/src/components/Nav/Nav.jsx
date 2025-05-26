import React from 'react';  
import {Link} from 'react-router-dom';
import "./Nav.css";

function Nav() {  
    return (  
        <nav>  
            <ul>  
                <li><Link to="/" className='item'>Inicio</Link></li>
                <li><Link to="/productos" className='item'>Productos</Link></li>  
                <li><Link to="/nosotros" className='item'>Nosotros</Link></li>  
                <li><Link to="/contacto" className='item'>Contacto</Link></li> 
                <li><Link to="/carrito" className='item'>Carrito</Link></li>   
                <li><Link to="/admin" className='item'>Admin</Link></li>  
                <li><Link to="/login" className='item'>Login</Link></li>  
            </ul>  
        </nav>  
    );  
}  

export default Nav;