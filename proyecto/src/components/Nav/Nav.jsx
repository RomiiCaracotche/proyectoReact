import './Nav.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartContext';
import { FaShoppingCart } from "react-icons/fa";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { TbLogout, TbLogout2 } from "react-icons/tb";

export default function Navv() {
    const { carrito } = useContext(CartContext);
    const { user, admin } = useAuthContext();
    const {logout} = useAuthContext();

    const handleSubmitLogout = (e) => {
        logout();       
    }

    return (    

        <Navbar expand="lg" style={{backgroundColor:"#ced4da"}}>
            <Container fluid>
                <Navbar.Brand href="/" className='fw-bold me-3 fst-italic'>Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" >
                        
                        <Nav.Link as={Link} to="/productos" className='fw-bold fs-6 me-3 border option-nav' style={{ color:'rgba(109, 177, 182, 1)'}}>Productos</Nav.Link>
                        <Nav.Link as={Link} to="/nosotros" className='fw-bold fs-6 me-3 border option-nav' style={{color:'rgba(122, 182, 190, 1)'}}>Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contacto" className='fw-bold fs-6 me-3 border option-nav' style={{color:'rgba(100, 150, 157, 1)'}}>Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/carrito" className='fw-bold fs-6 me-3 border option-nav' style={{color:'rgba(75, 115, 119, 1)'}}><span className='me-1'>{carrito.length}</span><FaShoppingCart/></Nav.Link>
                        { admin ? <Button variant="dark"><Link to="/admin/agregarProducto" className='fs-6 text-decoration-none text-light'>Agregar Producto</Link></Button> : <></> }
                    
                    </Nav>
                    
                        { (!admin && !user) ?
                            <Button variant="primary"><Link to="/login" className='text-white text-decoration-none'>Login <TbLogout/></Link></Button>
                            :
                            <Button variant="danger" onClick={handleSubmitLogout} className='text-white text-decoration-none'>Logout <TbLogout2/></Button>
                        } 
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
