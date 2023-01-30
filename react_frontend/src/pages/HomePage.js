import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <Container fluid="md">
                <Row className="justify-content-md-center my-3">
                    <Col md="4">
                    <Card>
                        <Card.Body>
                            <Card.Title>VIN Decoder</Card.Title>
                            <Card.Text>
                                Enter a vehicle identification number and get detailed data for that vehicle.
                            </Card.Text>
                            <Button variant="primary" href="/decode">Go to VIN Decoder</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center my-3">
                    <Col md="4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Research Helper</Card.Title>
                            <Card.Text>
                                Don't have a car in mind? Click here to research manufacturers, models, and more.
                            </Card.Text>
                            <Button variant="primary" href="/research">See More</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;