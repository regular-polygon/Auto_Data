import {React, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {Link, NavLink} from "react-router-dom"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SearchHistory from '../components/SearchHistory';
import axios from 'axios';

function VINDecoderForm({set_vehicle_data, set_search_history, search_history}){
    // handle redirect to results pages
    const navigate = useNavigate()
    const [input_vin, set_input_vin] = useState("")

    // handle VIN search submission
    async function onVINSearch(input_vin) {
        // call API
        console.log("Calling API with VIN:", input_vin)
        //const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin_input}?format=json`);
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${input_vin}?format=json`);
        if (response.status == 200) {
            const res_data = await response.data;
            console.log("response", res_data);
            set_vehicle_data(res_data);
            navigate("/decoderresults");
        } else {
            console.log("Failed to get data. Status code:", response.status);
            alert(`Failed to get data. Status code: ${response.status}`);
        }

        // retain a record of the three most recent searches
        if (search_history.length < 3) {
            set_search_history(search_history.concat(payload["vin_input"]));
        } else {
            set_search_history(search_history.slice(-2).concat(payload["vin_input"]));
        }
    }
    return (
        <Form id="vin_lookup_form" onSubmit={(event) => {event.preventDefault(); onVINSearch();}} className="vin_lookup" autoComplete='off' >
            <Form.Group className="mb-3" controlId="vin_input">
                <Form.Label>Enter Vehicle Identification Number(VIN):</Form.Label>
                <Form.Control onChange={(event)=>{set_input_vin(event.target.value)}} type="text" placeholder="Enter Vehicle Identification Number..." name="vin_input" style={{width: "50%", margin:"auto"}}/>
            </Form.Group>
            <Button type="button" onClick={() => {onVINSearch(input_vin)}} className="mb-3">Search!</Button>
        </Form>
    )
}

export default VINDecoderForm