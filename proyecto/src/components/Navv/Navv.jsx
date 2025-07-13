import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
/* import "./Navigator.css"; */
import { useAuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import { FaShoppingCart } from "react-icons/fa";
import { Navbar, Container, Form, Button, NavDropdown, Nav } from "react-bootstrap";

export default function Navv() {
    const { carrito } = useContext(CartContext);
    const { user, admin } = useAuthContext();
    const {logout} = useAuthContext();

    const handleSubmitLogout = (e) => {
        logout();       
    }

    return (    

        <Navbar expand="lg" className="" style={{backgroundColor:"#ced4da"}}>
            <Container fluid>
                <Navbar.Brand href="/" className='fw-bold'>Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" >
                        
                        <Nav.Link href="/productos" className='fw-bold fs-6'>Productos</Nav.Link>
                        <Nav.Link href="/nosotros" className='fw-bold fs-6'>Nosotros</Nav.Link>
                        <Nav.Link href="/contacto" className='fw-bold fs-6'>Contacto</Nav.Link>
                        <Nav.Link href="/carrito" className='fw-bold fs-6'><span className='me-1'>{carrito.length}</span><FaShoppingCart/></Nav.Link>
                        
                        { admin ? <Button variant="dark"><Link to="/admin/agregarProducto" className='fs-6 text-decoration-none text-light'>Agregar Producto</Link></Button> : <></> }

                       {/*  { admin ? <Link to="/admin/agregarProducto" className=''>Agregar Producto</Link> : <></> } */}
                    

                    </Nav>
                    
                        { (!admin && !user) ?
                            <Button variant="primary"><Link to="/login" className='text-white text-decoration-none'>Login</Link></Button>
                            :
                            <Button variant="danger" onClick={handleSubmitLogout} className='text-white text-decoration-none'>Logout</Button>
                        } 
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    
    );
}
