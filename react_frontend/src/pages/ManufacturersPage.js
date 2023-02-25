import {React, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MfrForm from "../components/MfrForm";
import MfrInfo from "../components/MfrInfo";
import MfrDetailsTable from "../components/MfrDetails";
import MfrWiki from "../components/MfrWiki";
import axios from "axios";

function ManufacturersPage(){

    // set manufacturer selection
    const [mfrSelections, setMfrSelections] = useState([]);
    const [mfrDetails, setMfrDetails] = useState(null);
    const [mfrInfoBox, setMfrInfoBox] = useState(null);

    // make API call to get manufacturer details
    // also sets the MfrDetails state variable
    async function getMfrDetails(mfrSelections) {
        if (mfrSelections.length > 0) {
            const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${mfrSelections[0]["Mfr_ID"]}?format=json`, {
                method: "GET",
            });
            // handle the response.
            if (response.status == 200) {
                const res_data = await response.data;
                console.log("NHTSA response", res_data);
                setMfrDetails(res_data);
            } else {
                console.log("Failed to get data mfr details. Status code:", response.status);
                alert(`Failed to get data mfr details. Status code: ${response.status}`);
                setMfrDetails(null);
            }
        } else {
            setMfrDetails(null);
        }
    }

    // if available, extract wikipedia link from mfr data
    // call Wikipedia InfoBox microservice
    // set the mfrInfoBox state variable
    async function getMfrInfoBox(mfrSelections) {
        if (mfrSelections.length > 0 && mfrSelections[0].hasOwnProperty("wiki_link")) {
            const response = await axios.get(`/api2/?link=${mfrSelections[0]["wiki_link"]}`, {
                method: "GET",
            });
            // handle the response.
            if (response.status == 200) {
                const res_data = await response.data;
                setMfrInfoBox(res_data);
                console.log("Info Box Response", res_data);
            } else {
                console.log("Failed to get data info box. Status code:", response.status);
                alert(`Failed to get data info box. Status code: ${response.status}`);
                setMfrInfoBox(null);
            }
        } else {
            setMfrInfoBox(null);
        }
        
    }

    // get new manufacturer details whenever the manufacturer selection changes.
    useEffect(() => {
        console.log("updated to", mfrSelections);
        getMfrDetails(mfrSelections);
        getMfrInfoBox(mfrSelections);
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
        <MfrWiki mfrInfoBox = {mfrInfoBox}/>
        </>
    )
}

export default ManufacturersPage;