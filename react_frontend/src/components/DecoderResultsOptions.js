import React from "react"
import {useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown"
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DecoderResultsOptions({on_see_all_results_click}){
    const navigate = useNavigate();
    return (
        <Container className="mb-3">
            <Row className="justify-content-md-center">
                <Col xs lg="3">
                    <Button type="button" className="btn-info" onClick={() => {navigate("/research/comparevehicles")}}>Compare Vehicles</Button>
                </Col>
                <Col xs lg="3">
                    <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            Advanced Options
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={on_see_all_results_click}>Show All Vehicle Attributes</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row> 
        </Container>
    )
}

export default DecoderResultsOptions;
