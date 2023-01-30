import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(){
    return (
        <div className="NavBar">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">AutoDB</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/decode">VIN Decoder</Nav.Link>
                        <Nav.Link href="/research">Research Helper</Nav.Link>
                        <Nav.Link href="/decoderresults">Results</Nav.Link>
                    </Nav>
                </Container>
        </Navbar>
        </div>
    )
}

export default NavBar
