import {useState, useEffect, React} from "react"
import {Link, Navigate, useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Dropdown from "react-bootstrap/Dropdown"
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import VINRecallInfo from "../components/VINRecallInfo";
import axios from "axios";

function DecoderResultsPage({vehicle_data}) {
    // This page shouldn't render anything if vehicle_data is not set. 
    if (Object.entries(vehicle_data).length == 0) {
        return (
            <p>Vehicle data not set.</p>
        )
    }

    const navigate = useNavigate()

    const vehicle_data_key_val = vehicle_data["Results"][0];  // an object of vehicle attributes and values

    const [recall_data, set_recall_data] = useState(null)
    const [basic_filter, set_basic_filter] = useState(false)
    const [performance_filter, set_performance_filter] = useState(false)
    const [safety_filter, set_safety_filter] = useState(false)

    let default_filter_options = ["ModelYear", "Make", "VehicleType", "Trim", "Series"];
    let basic_options = ["BasePrice", "BodyClass", "FuelTypePrimary"];
    let performance_options = ["TransmissionStyle", "TransmissionSpeeds", "DriveType", "EngineCylinders", "DisplacementL", "Top SpeedMPH"]
    let safety_options = ["AirBagLocCurtain", "AirBagLocFront", "AirBagLocSide", "ABS", "ESC", 
    "TractionControl", "TPMS", "AdaptiveCruiseControl", "BlindSpotMon", "ForwardCollisionWarning", "RearVisibilitySystem"];
    
    // set up initial table data
    let init_key_val = Object.fromEntries(
        Object.entries(vehicle_data_key_val).filter(
            ([key, val]) => default_filter_options.includes(key)
        )
    )
    // the filtered_key_val_list is used to populate the html table
    const [filtered_key_val, set_filtered_key_val] = useState(init_key_val)

    // when user attempts to filter the list, update the filtered_key_val_list accordingly
    function onFilterClick(){
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
    
    // In advanced options, users can choose to see all available (attribute, value) pairs. 
    // This will completely undo the filter. 
    function onSeeAllResultsClick() {
        set_filtered_key_val(vehicle_data_key_val);
    }

    // call API and get vehicle recall info
    async function get_recall_data() {
        // call API to get vehicle recall data
        const [make, model, year] = [vehicle_data_key_val["Make"], vehicle_data_key_val["Model"], vehicle_data_key_val["ModelYear"]]
        console.log("Calling API with:", make, model, year)
        const response = await axios.get(`http://localhost:3839/api3/?make=${make}&model=${model}&year=${year}`);
        if (response.status == 200) {
            const res_data = await response.data;
            console.log("Get NHTSA Recall Response:", res_data);
            set_recall_data(JSON.parse(res_data));
        } else {
            console.log("Failed to get data. Status code:", response.status);
            alert(`Failed to get data. Status code: ${response.status}`);
        }
    }

    useEffect(()=>{
        get_recall_data()
    }, [])

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/decode">VIN Decoder</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Results</Breadcrumb.Item>
            </Breadcrumb>
            <h2>VIN Decode Results</h2>
            
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
                                <Dropdown.Item onClick={onSeeAllResultsClick}>Show All Vehicle Attributes</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row> 
            </Container>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="5">
                        <h3>Filter Options</h3>
                        <Form>
                            <Form.Check onClick={()=>{set_basic_filter(basic_filter == false ? true : false)}} label="Get Basic Attributes" type="checkbox" id="show_basic_attributes" name="show_basic_attributes"/>
                            <Form.Check onClick={()=>{set_performance_filter(performance_filter == false ? true : false)}} label="Get Performance Attributes" type="checkbox" id="show_performance_attributes" name="show_performance_attributes"/>
                            <Form.Check onClick={()=>{set_safety_filter(safety_filter == false ? true : false)}} label="Get Safety Attributes" type="checkbox" id="show_safety_attributes" name="show_safety_attributes"/>
                        </Form>
                        <Button type="button" className="px-5 btn-success" onClick={onFilterClick}>Filter Results</Button>
                    </Col>
                </Row>
            </Container>
            <b>
            <div>Search VIN: {vehicle_data["Results"][0]["VIN"]}</div>
            <div>Data Quality: {JSON.stringify(vehicle_data_key_val["ErrorText"])}</div>
            </b>

            <div className="container">
            <Table striped hover bordered size="sm">
                <thead>
                    <tr>
                        <th style={{width: "30%"}}>Attribute</th>
                        <th style={{width: "50%"}}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(filtered_key_val).map(entry => <tr key={entry[0]}><td>{entry[0]}</td><td>{entry[1]}</td></tr>)}
                </tbody>
            </Table>
            </div>
            <VINRecallInfo recall_data={recall_data}/>
        </div>
    )
}

export default DecoderResultsPage;