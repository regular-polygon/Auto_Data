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
    const {vin_input} = req.body;

    // call API
    console.log("Target VIN:", vin_input)
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin_input}?format=json`).then((response) => {
        console.log(response.status);
        console.log(response.statusText);
        if (response.statusText == "OK") {
            res.status(200).json(response.data);
        } else {
            res.status(response.status).send();
        }
    }).catch((error) => {
        console.log(error.response.status);
        res.status(error.response.status).send();
    })
})

app.get("/api/VINLookup/:VIN"), (req, res) => {
    res.json({"target": req.params.VIN});
}

const PORT = 4000;
app.listen(PORT, ()=> {console.log(`Server listening at PORT: ${PORT}`)});
