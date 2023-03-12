import {useState, useEffect, React} from "react"
import {Link, Navigate, useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Dropdown from "react-bootstrap/Dropdown"
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import VINRecallInfo from "../components/VINRecallInfo";
import DecoderResultsTable from "../components/DecoderResultsTable";
import DecoderResultsFilter from "../components/DecoderResultsFilter";
import DecoderResultsOptions from "../components/DecoderResultsOptions";

function DecoderResultsPage({vehicle_data}) {
    // This page shouldn't render anything if vehicle_data is not set. 
    if (Object.entries(vehicle_data).length == 0) {
        return (
            <p>Vehicle data not set.</p>
        )
    }

    // an object of vehicle attributes and values
    const vehicle_data_key_val = vehicle_data["Results"][0];  
    // recall data, which is rendered below the vehicle data table
    const [recall_data, set_recall_data] = useState(null)
    
    // set up initial table data
    let default_filter_options = ["ModelYear", "Make", "VehicleType", "Trim", "Series"];
    let init_key_val = Object.fromEntries(
        Object.entries(vehicle_data_key_val).filter(
            ([key, val]) => default_filter_options.includes(key)
        )
    )
    // the filtered_key_val_list is used to populate the html table
    const [filtered_key_val, set_filtered_key_val] = useState(init_key_val)

    // In advanced options, users can choose to see all available (attribute, value) pairs. 
    // This will completely undo the filter and show all attribute, value pairs. 
    function on_see_all_results_click() {
        set_filtered_key_val(vehicle_data_key_val);
    }

    // call API and get vehicle recall info
    async function get_recall_data() {
        // call API to get vehicle recall data
        const [make, model, year] = [vehicle_data_key_val["Make"], vehicle_data_key_val["Model"], vehicle_data_key_val["ModelYear"]]
        console.log("Calling API with:", make, model, year)
        const response = await axios.get(`http://localhost:3839/api3/?make=${make}&model=${model}&year=${year}`);
        if (response.status == 200) {
            const res_data = await response.data;
            console.log("Get NHTSA Recall Response:", res_data);
            set_recall_data(JSON.parse(res_data));
        } else {
            console.log("Failed to get data. Status code:", response.status);
            alert(`Failed to get data. Status code: ${response.status}`);
        }
    }
    // run get_recall_data once 
    useEffect(()=>{
        get_recall_data()
    }, [])

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/decode">VIN Decoder</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Results</Breadcrumb.Item>
            </Breadcrumb>
            <h2>VIN Decode Results</h2>
            <DecoderResultsOptions on_see_all_results_click={on_see_all_results_click}/>
            <DecoderResultsFilter set_filtered_key_val={set_filtered_key_val} default_filter_options={default_filter_options} vehicle_data_key_val={vehicle_data_key_val}/>
            <div>Search VIN: {vehicle_data_key_val["VIN"]}</div>
            <div>Data Quality: {vehicle_data_key_val["ErrorText"]}</div>
            <DecoderResultsTable filtered_key_val={filtered_key_val}/>
            <VINRecallInfo recall_data={recall_data}/>
        </div>
    )
}

export default DecoderResultsPage;