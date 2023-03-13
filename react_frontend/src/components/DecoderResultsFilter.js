import {React, useState} from 'react';
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


function DecoderResultsFilter({vehicle_data_key_val, set_filtered_key_val, default_filter_options}){
    const [basic_filter, set_basic_filter] = useState(false)
    const [performance_filter, set_performance_filter] = useState(false)
    const [safety_filter, set_safety_filter] = useState(false)

    let basic_options = ["BasePrice", "BodyClass", "FuelTypePrimary"];
    let performance_options = ["TransmissionStyle", "TransmissionSpeeds", "DriveType", "EngineCylinders", "DisplacementL", "Top SpeedMPH"]
    let safety_options = ["AirBagLocCurtain", "AirBagLocFront", "AirBagLocSide", "ABS", "ESC", 
    "TractionControl", "TPMS", "AdaptiveCruiseControl", "BlindSpotMon", "ForwardCollisionWarning", "RearVisibilitySystem"];

    // when user attempts to filter the list, update the filtered_key_val_list accordingly
    function on_filter_click(){
        let filter_options = default_filter_options
        if (basic_filter) {
            filter_options = filter_options.concat(basic_options)
        }
        if (performance_filter) {
            filter_options = filter_options.concat(performance_options)
        }
        if (safety_filter) {
            filter_options = filter_options.concat(safety_options)
        }

        let new_table_data = Object.fromEntries(
            Object.entries(vehicle_data_key_val).filter(
                ([key, val]) => filter_options.includes(key)
            ).sort(
                ([key1,val1], [key2, val2]) => key1.localeCompare(key2)
            )
        )
        set_filtered_key_val(new_table_data)
    }
    return (
        <Container fluid>
                <Row className="justify-content-md-center">
                    <Col>
                        <b>Filter Results</b>
                        <Form>
                            <Form.Check onClick={()=>{set_basic_filter(basic_filter == false ? true : false)}} label="Get Basic Data" type="checkbox" id="show_basic_attributes" name="show_basic_attributes"/>
                            <Form.Check onClick={()=>{set_performance_filter(performance_filter == false ? true : false)}} label="Get Performance Data" type="checkbox" id="show_performance_attributes" name="show_performance_attributes"/>
                            <Form.Check onClick={()=>{set_safety_filter(safety_filter == false ? true : false)}} label="Get Safety Data" type="checkbox" id="show_safety_attributes" name="show_safety_attributes"/>
                        </Form>
                        <Button type="button" className="px-3 mb-3 btn-success" onClick={on_filter_click}>Update Results</Button>
                    </Col>
                </Row>
        </Container>
    )
}

export default DecoderResultsFilter;
