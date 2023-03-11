import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ResearchHelperPage({set_vehicle_data}) {
    const navigate = useNavigate();
    // reset vehicle data if user goes to the vehicle comparison page via the button on this page
    // so the VIN for vehicle 1 will not be populated with the VIN entered on the decoder page
    function on_vehicle_comarison_tool_click(){
        set_vehicle_data({});
        navigate("/research/comparevehicles")
    }

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
                            <Button variant="info" type="button" onClick={()=>{navigate("/research/manufacturers")}}>Research Manufacturers</Button>
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
                            <Button variant="info" type="button" onClick={on_vehicle_comarison_tool_click}>Vehicle Comparison Tool</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResearchHelperPage;