const axios = require('axios')
const bodyParser = require('body-parser');
const express = require('express');
// instantiate server
const app = express();


// middleware
app.use(express.json());
// app.use(bodyParser.json());

// route handlers
app.post("/api/VINLookup", async (req, res) => {
    // req.body is an object not a string
    console.log(req.body);
    const {vin_input, show_basic_attributes, show_performance_attributes, show_safety_attributes} = req.body;

    // set data filtering options
    let options = ["Manufacturer Name", "Model", "Model Year"];
    if(show_basic_attributes == "on") {
        console.log("basic is on");
        options = options.concat(["Plant City", "Plant Country", "Body Class", "Doors", "Trim"])
    }
    if(show_performance_attributes == "on") {
        console.log("performance is on");
        options = options.concat(["Transmission Style", "Drive Type", "Displacement (CC)", "Engine Power (kW)", "Fuel Type - Primary", "Valve Train Design"]);
    }
    if(show_safety_attributes == "on") {
        console.log("safety is on");
        options = options.concat(["Curtain Air Bag Locations", 
        "Front Air Bag Locations", 
        "Anti-lock Braking System (ABS)", 
        "Electronic Stability Control (ESC)",
        "Tire Pressure Monitoring System (TPMS) Type",
        "Crash Imminent Braking (CIB)"]);
    }

    // call API
    let vehicle_data;
    let filtered_vehicle_data = {}
    console.log("Target VIN:", vin_input)
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin_input}?format=json`).then((response) => {
        // console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        vehicle_data = response.data;
        for (const {Value, Variable} of vehicle_data['Results']) {
            if (options.includes(Variable)) {
                console.log("pushed var and value")
                filtered_vehicle_data[Variable] = Value;
            }
        }
        console.log(options);
        console.log("filtered", filtered_vehicle_data);
        res.json(filtered_vehicle_data);
    })
})

app.get("/api/VINLookup/:VIN"), (req, res) => {
    res.json({"target": req.params.VIN});
}

const PORT = 4000;
app.listen(PORT, ()=> {console.log(`Server listening at PORT: ${PORT}`)});
