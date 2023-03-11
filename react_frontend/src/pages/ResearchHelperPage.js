import React from 'react';
import {Link} from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ResearchHelperPage() {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Research Helper</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Research Helper</h1>
            <Container fluid="md">
                <Row className="justify-content-md-center my-3">
                    <Col md="8">
                    <Card>
                        <Card.Body>
                            <Card.Title>Car Manufacturers Data</Card.Title>
                            <Card.Text>
                                Select a car manufacturer and get detailed data for that vehicle from the National Highway Traffic Safety Administration.
                                Wikipedia data is available for the top 50 car manufacturers.
                            </Card.Text>
                            <Button variant="info" as={Link} to="/research/manufacturers">Research Manufacturers</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center my-3">
                    <Col md="8">
                    <Card>
                        <Card.Body>
                            <Card.Title>Compare Vehicles</Card.Title>
                            <Card.Text>
                                Compare two vehicles side by side. Two vehicle identification numbers are required.
                            </Card.Text>
                            <Button variant="info" as={Link} to="/research/comparevehicles">Vehicle Comparison Tool</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResearchHelperPage;