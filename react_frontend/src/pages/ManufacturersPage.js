import {React, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MfrForm from "../components/MfrForm";
import MfrInfo from "../components/MfrInfo";
import MfrDetailsTable from "../components/MfrDetails";
import axios from "axios";

function ManufacturersPage(){

    // set manufacturer selection
    const [mfrSelections, setMfrSelections] = useState([]);
    const [mfrDetails, setMfrDetails] = useState(null);
    const [mfrWiki, setMfrWiki] = useState(null);

    // make API call to get manufacturer details
    // also sets the MfrDetails state variable
    async function getMfrDetails(mfrSelections) {
        if (mfrSelections.length > 0) {
            const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${mfrSelections[0]["Mfr_ID"]}?format=json`, {
                method: "GET",
            });
            
            // handle the microservice response.
            if (response.status == 200) {
                const res_data = await response.data;
                console.log("NHTSA response", res_data);
                setMfrDetails(res_data);
            } else {
                console.log("Failed to get data. Status code:", response.status);
                alert(`Failed to get data. Status code: ${response.status}`);
                setMfrDetails(null);
            }
        } else {
            setMfrDetails(null);
        }
    }

    // get new manufacturer details whenever the manufacturer selection changes.
    useEffect(() => {
        console.log("updated to", mfrSelections);
        getMfrDetails(mfrSelections);
    }, [mfrSelections])

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Research Helper</Breadcrumb.Item>
        </Breadcrumb>
        <MfrForm mfrSelections={mfrSelections} setMfrSelections={setMfrSelections}/>
        <MfrInfo mfrSelections={mfrSelections}/>
        <MfrDetailsTable mfrDetails={mfrDetails}/>
        </>
    )
}

export default ManufacturersPage;