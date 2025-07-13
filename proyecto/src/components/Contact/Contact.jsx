import "./Contact.css";
import { Form, Button, Container } from "react-bootstrap";

function Contact() {
    return (
       
        <div className='h-75 d-flex flex-column justify-content-center align-items-center'>
                <Container className='w-50 d-flex flex-column justify-content-center align-items-center mt-5 p-4 rounded border border-secondary' style={{}}>

                    <Form className='w-100 d-flex flex-column justify-content-center align-items-center'>
                        <Form.Label className='fw-bold fs-4 text-decoration-underline'>Contactanos</Form.Label>         
                        
                        <Form.Group className="mb-3 w-100 fw-bold">
                            <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                            <Form.Control id="nombre" type="text" name="name" required />
                        </Form.Group>

                        <Form.Group className="mb-3 w-100 fw-bold">
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control id="email" type="email" name="email" required />
                        </Form.Group>

                        <Form.Group className="mb-3 w-100 fw-bold">
                            <Form.Label htmlFor="telefono">Telefono:</Form.Label>
                            <Form.Control id="telefono" type="number" name="telefono" required min="0" />
                        </Form.Group>

                        <Form.Group className="mb-3 w-100 fw-bold" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Consulta:</Form.Label>
                            <Form.Control as="textarea" placeholder="Ingrese la consulta aqui..." rows={3} required />
                        </Form.Group>

                        <Button variant="info" type="submit" className='w-100 mt-3 fw-bold border border-black'>Contactar</Button>
                    </Form>

                </Container>
            </div>
    );
}

export default Contact;