import {React, useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';

function VehicleComparisonForm({vehicle_data, set_car1_data, set_car2_data}) {
    const [car1_vin, set_car1_vin] = useState("")
    const [car2_vin, set_car2_vin] = useState("")
    
    // if we've already decoded one VIN, use it as vehicle one
    useEffect(() => {
        if (Object.entries(vehicle_data).length != 0) {
            set_car1_vin(vehicle_data["Results"][0]["VIN"])
            set_car1_data(vehicle_data)
        }
    }, [vehicle_data])
    
    async function on_compare_click(){
        // input data validation
        if (car1_vin.length < 17 || car2_vin.length < 17) {
            alert("Please enter two complete 17-digit VINs.");
            return null;
        }
        // get data for vehicle 1
        const response1 = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${car1_vin}?format=json`);
        if (response1.status == 200) {
            const res_data = await response1.data;
            console.log("Compare response 1", res_data);
            set_car1_data(res_data["Results"][0]);
        } else {
            console.log("Failed to get data. Status code:", response1.status);
            alert(`Failed to get data. Status code: ${response1.status}`);
        }
        // get data for vehicle 2
        const response2 = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${car2_vin}?format=json`);
        if (response2.status == 200) {
            const res_data = await response2.data;
            console.log("Compare response 2", res_data);
            set_car2_data(res_data["Results"][0]);
        } else {
            console.log("Failed to get data. Status code:", response2.status);
            alert(`Failed to get data. Status code: ${response2.status}`);
        }
    }

    return (
        <Form id="vin_lookup_form" onSubmit={(event) => {event.preventDefault();}} className="vin_lookup" autoComplete='off' >
            <Form.Group className="mb-3" controlId="compare_vehicle_input">
                <Form.Label>Enter Vehicle Identification Number(VIN):</Form.Label>
                <Form.Control type="text" value={car1_vin} onChange={(event) => {set_car1_vin(event.target.value)}} placeholder="Enter VIN for vehicle 1..." name="car1_vin_input" style={{width: "50%", margin:"auto"}}/>
                <Form.Control type="text" value={car2_vin} onChange={(event) => {set_car2_vin(event.target.value)}} placeholder="Enter VIN for vehicle 2..." name="car2_vin_input" style={{width: "50%", margin:"auto"}} className="my-2"/>
            </Form.Group>
            <Button type="button" onClick={on_compare_click} className="mb-3">Compare Vehicles</Button>
        </Form>
    )
}

export default VehicleComparisonForm;