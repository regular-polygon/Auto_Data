import {React, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MfrForm from "../components/MfrForm";
import MfrDetailsTable from "../components/MfrDetailsTable";
import MfrWikiTable from "../components/MfrWikiTable";
import axios from "axios";

function ManufacturersPage(){
    // set manufacturer selection
    const [mfr_selections, set_mfr_selections] = useState([]);
    const [mfr_details, set_mfr_details] = useState(null);
    const [mfr_info_box, set_mfr_infobox] = useState(null);

    // make API call to get manufacturer details
    // also sets the MfrDetails state variable
    async function get_mfr_details(mfr_selections) {
        if (mfr_selections.length > 0) {
            const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${mfr_selections[0]["Mfr_ID"]}?format=json`, {
                method: "GET",
            });
            // handle the response.
            if (response.status == 200) {
                const res_data = await response.data;
                console.log("NHTSA response", res_data);
                set_mfr_details(res_data);
            } else {
                console.log("Failed to get data mfr details. Status code:", response.status);
                alert(`Failed to get data mfr details. Status code: ${response.status}`);
                set_mfr_details(null);
            }
        } else {
            set_mfr_details(null);
        }
    }

    // if available, extract wikipedia link from mfr data
    // call Wikipedia InfoBox microservice
    // set the mfrInfoBox state variable
    async function get_mfr_infobox(mfr_selections) {
        if (mfr_selections.length > 0 && mfr_selections[0].hasOwnProperty("wiki_link")) {
            const response = await axios.get(`/api2/?link=${mfr_selections[0]["wiki_link"]}`, {
                method: "GET",
            });
            // handle the response.
            if (response.status == 200) {
                const res_data = await response.data;
                set_mfr_infobox(res_data);
                console.log("Info Box Response", res_data);
            } else {
                console.log("Failed to get data info box. Status code:", response.status);
                alert(`Failed to get data info box. Status code: ${response.status}`);
                set_mfr_infobox(null);
            }
        } else {
            set_mfr_infobox(null);
        }
        
    }

    // get new manufacturer details whenever the manufacturer selection changes.
    useEffect(() => {
        console.log("updated to", mfr_selections);
        get_mfr_details(mfr_selections);
        get_mfr_infobox(mfr_selections);
    }, [mfr_selections])

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Research Helper</Breadcrumb.Item>
        </Breadcrumb>
        <MfrForm mfr_selections={mfr_selections} set_mfr_selections={set_mfr_selections}/>
        <MfrDetailsTable mfr_details={mfr_details}/>
        <MfrWikiTable mfr_infobox = {mfr_info_box}/>
        </>
    )
}

export default ManufacturersPage;