import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Breadcrumb from 'react-bootstrap/Breadcrumb';


function VINDecoderPage({set_vehicle_data}){
    const navigate = useNavigate()
    // handle VIN search submission
    async function onVINSearch() {
        const form = document.getElementById("vin_lookup_form");
        const formData = new FormData(form);
        const payload = {};
        for (const [key, value] of formData){
            payload[key] = value;
        }
        console.log("post payload", payload);
    
        const response = await fetch("/api/VINLookup", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
              }
        });
    
        if (response.ok) {
            const res_data = await response.json()
            console.log("response", res_data);
            set_vehicle_data(res_data);
            const lookup_res_element = document.getElementById("lookup_res");
            lookup_res_element.innerHTML = JSON.stringify(res_data);
            navigate("/decoderresults");
        } else {
            console.log("Failed to get data. Status code:", response.status);
            const lookup_res_element = document.getElementById("lookup_res");
            lookup_res_element.innerHTML = `Failed to get data. Status code: ${response.status}`;
        }
    }

    return (
        <div>
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>VIN Decoder</Breadcrumb.Item>
        </Breadcrumb>
        <h1>VIN Decoder</h1>
        <Form id="vin_lookup_form" action="" method="post" className="vin_lookup" >
            <Form.Group className="mb-3" controlId="vin_input">
                <Form.Label>Enter Vehicle Identification Number(VIN):</Form.Label>
                <Form.Control type="text" placeholder="Enter Vehicle Identification Number..." name="vin_input" style={{width: "50%", margin:"auto"}}/>
            </Form.Group>
            <Button type="button" onClick={onVINSearch} className="mb-3">Search!</Button>
        </Form>
        <p style={{width: "50%", margin:"auto"}}>
            NOTE: Any missing decoded values should be interpreted as NHTSA does not have data on the specific variable. 
            Missing value should NOT be interpreted as an indication that a feature or technology is unavailable for a vehicle.
        </p>
        <div id="lookup_res"></div>
        </div>
    )
}

export default VINDecoderPage;