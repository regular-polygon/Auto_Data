import {React, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MfrForm from "../components/MfrForm";
import MfrInfo from "../components/MfrInfo";

function ManufacturersPage(){

    // set manufacturer selection
    const [mfrSelections, setMfrSelections] = useState([]);
    const [mfrDetails, setMfrDetails] = useState(null);
    // used to make API call
    async function getMfrDetails(mfrSelections) {
        if (mfrSelections.length > 0) {
            const response = await fetch("/api/VINLookup", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                  }
            });
            
            // handle the microservice response.
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
    }
    useEffect(() => {
        console.log("updated to", mfrSelections)
    }, [mfrSelections])

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Research Helper</Breadcrumb.Item>
        </Breadcrumb>
        <MfrForm mfrSelections={mfrSelections} setMfrSelections={setMfrSelections}/>
        <MfrInfo mfrSelections={mfrSelections}/>
        </>
    )
}

export default ManufacturersPage;