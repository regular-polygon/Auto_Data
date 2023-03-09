import React from 'react'
import {Link, NavLink} from 'react-router-dom';
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
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/decode">VIN Decoder</Nav.Link>
                        <Nav.Link as={NavLink} to="/research">Research Helper</Nav.Link>
                        {/* <Nav.Link as={NavLink} to="/decoderresults">Results</Nav.Link> */}
                    </Nav>
                </Container>
        </Navbar>
        </div>
    )
}

export default NavBar
