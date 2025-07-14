import { useState } from 'react';
import { useAuthContext } from './../../contexts/AuthContext.jsx';
import { crearUsuario, loginEmailPass } from '../../auth/firebase.js';
import { Form, Button, Container, InputGroup } from "react-bootstrap";

function Login() {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const { login, user, logout, admin } = useAuthContext();
    const [show, setShow] = useState(true);

    function registrarUsuario(e) {
        e.preventDefault();
        crearUsuario(usuario, password)
            .then((user) => login(usuario))
            .catch((error) => {
                if (error.code == 'auth/invalid-credential') {
                    alert("Credenciales incorrectas");
                }
                if (error.code == 'auth/weak-password') {
                    alert("Contraseña debil, deberia tener mas de 6 caracteres");
                }
            })
        login(usuario);
    }

    function iniciarSesionEmailPass(e) {
        e.preventDefault();
        loginEmailPass(usuario, password)
            .then((user) => login(usuario))
            .catch((error) => {
                if (error.code == 'auth/invalid-credential') {
                    alert("icredenciales incorrectas");
                }
            })
    }

    function handleShow(e) {
        e.preventDefault();
        setShow(!show);
    }

    if (!user && show) {
        return (

            <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
                <Container className='w-50 d-flex flex-column justify-content-center align-items-center mt-5 p-4 rounded border border-secondary' style={{}}>

                    <Form onSubmit={iniciarSesionEmailPass} className='w-100 d-flex flex-column justify-content-center align-items-center'>

                        <Form.Label className='fw-bold fs-4'>Iniciar Sesión</Form.Label>         
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" className='fw-bold'>Email</InputGroup.Text>
                            <Form.Control type="email" placeholder="Ingrese su email" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" className='fw-bold'>Contraseña</InputGroup.Text>
                            <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </InputGroup>

                        <Button variant="primary" type="submit" className='w-100 mt-3'>Ingresar</Button>
                    </Form>

                    <Button variant="secondary" onClick={handleShow} className='w-100 mt-3'>Registrate</Button>

                </Container>
            </div>
        )
    }

    if (!user && !show) {
        return (

            <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
                <Container className='w-50 d-flex flex-column justify-content-center align-items-center mt-5 p-4 rounded border border-secondary' style={{}}>

                    <Form onSubmit={registrarUsuario} className='w-100 d-flex flex-column justify-content-center align-items-center'>

                        <Form.Label className='fw-bold fs-4'>Registrarse</Form.Label>         
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" className='fw-bold'>Email</InputGroup.Text>
                            <Form.Control type="email" placeholder="Ingrese su email" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" className='fw-bold'>Contraseña</InputGroup.Text>
                            <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </InputGroup>

                        <Button variant="primary" type="submit" className='w-100 mt-3'>Registrarse</Button>
                    </Form>

                    <Button variant="secondary" onClick={handleShow} className='w-100 mt-3'>Iniciar Sesión</Button>

                </Container>
            </div>

        )
    }
}

export default Login;