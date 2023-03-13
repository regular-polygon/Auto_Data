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
            <>  
                <b>Other Options</b>
                <Dropdown>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic" className="mx-1 my-1">
                        Advanced Filters
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={on_see_all_results_click}>Show All Vehicle Attributes</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Button type="button" className="mx-1 btn-info" onClick={() => {navigate("/research/comparevehicles")}}>Compare Vehicles</Button>
                
            </>
    )
}

export default DecoderResultsOptions;
