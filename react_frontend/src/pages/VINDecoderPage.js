import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {Link, NavLink} from "react-router-dom"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SearchHistory from '../components/SearchHistory';

function VINDecoderPage({set_vehicle_data, search_history, set_search_history}){
    // handle redirect to results pages
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

        // handle search history update
        if (search_history.length < 3) {
            set_search_history(search_history.concat(payload["vin_input"]));
        } else {
            set_search_history(search_history.slice(-2).concat(payload["vin_input"]));
        }

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
            navigate("/decoderresults");
        } else {
            console.log("Failed to get data. Status code:", response.status);
            alert(`Failed to get data. Status code: ${response.status}`);
        }
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>VIN Decoder</Breadcrumb.Item>
            </Breadcrumb>
            <h1>VIN Decoder</h1>
            <Form id="vin_lookup_form" onSubmit={(event) => {event.preventDefault(); onVINSearch();}} className="vin_lookup" autoComplete='off' >
                <Form.Group className="mb-3" controlId="vin_input">
                    <Form.Label>Enter Vehicle Identification Number(VIN):</Form.Label>
                    <Form.Control type="text" placeholder="Enter Vehicle Identification Number..." name="vin_input" style={{width: "50%", margin:"auto"}}/>
                </Form.Group>
                <Button type="button" onClick={onVINSearch} className="mb-3">Search!</Button>
            </Form>
            <SearchHistory search_history={search_history}/>
            <p style={{width: "50%", margin:"auto"}}>
                NOTE: If a decoded value is missing, that means NHTSA does not have data on that variable.
                It doesn't mean that the feature is not available for that vehicle.
            </p>
            <div id="lookup_res"></div>
        </div>
    )
}

export default VINDecoderPage;