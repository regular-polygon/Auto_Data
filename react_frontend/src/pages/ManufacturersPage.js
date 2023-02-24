import {React, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MfrForm from "../components/MfrForm";
import MfrInfo from "../components/MfrInfo";
import axios from "axios";

function ManufacturersPage(){

    // set manufacturer selection
    const [mfrSelections, setMfrSelections] = useState([]);
    const [mfrDetails, setMfrDetails] = useState(null);
    const [mfrWiki, setMfrWiki] = useState(null);

    // used to make API call
    async function getMfrDetails(mfrSelections) {
        if (mfrSelections.length > 0) {
            const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${mfrSelections[0]["Mfr_ID"]}?format=json`, {
                method: "GET",
            });
            
            // handle the microservice response.
            if (response.status == 200) {
                const res_data = await response.data
                console.log("response", res_data);
                setMfrDetails(res_data);
            } else {
                console.log("Failed to get data. Status code:", response.status);
                alert(`Failed to get data. Status code: ${response.status}`);
            }
        }
    }
    useEffect(() => {
        console.log("updated to", mfrSelections)
        getMfrDetails(mfrSelections)
    }, [mfrSelections])

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Research Helper</Breadcrumb.Item>
        </Breadcrumb>
        <MfrForm mfrSelections={mfrSelections} setMfrSelections={setMfrSelections}/>
        <MfrInfo mfrSelections={mfrSelections}/>
        <p>{mfrDetails != null ? JSON.stringify(mfrDetails) : "No details yet."}</p>
        </>
    )
}

export default ManufacturersPage;