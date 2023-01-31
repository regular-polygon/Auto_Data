import {useState, useEffect, React} from "react"
import {Link, NavLink} from "react-router-dom"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Dropdown from "react-bootstrap/Dropdown"

function DecoderResultsPage({vehicle_data}) {
    const data_obj_list = vehicle_data["Results"];
    // an object containing variable: value pairs from the data_obj_list
    const key_val_obj = {}
    for (let item of data_obj_list) {
        key_val_obj[item["Variable"]] = item["Value"];
    }

    let filter_options = ["Model Year", "Make", "Vehicle Type", "Trim", "Series"];
    let basic_options = ["Base Price ($)", "Body Class", "Fuel Type - Primary"];
    let performance_options = ["Transmission Style", "Transmission Speeds", "Drive Type", "Engine Number of Cylinders", "Displacement (L)", "Top Speed (MPH)"]
    let safety_options = ["Curtain Air Bag Locations", "Front Air Bag Locations", "Side Air Bag Locations", "Anti-lock Braking System (ABS)", "Electronic Stability Control (ESC)", 
    "Traction Control", "Tire Pressure Monitoring System (TPMS) Type", "Adaptive Cruise Control (ACC)", "Blind Spot Warning (BSW)", "Forward Collision Warning (FCW)", "Backup Camera"];

    // generate a minimal default results list
    let init_list = [];
    for (let attribute of filter_options) {
        let item = {}
        item["Variable"] = attribute
        item["Value"] = key_val_obj[attribute]
        init_list.push(item);
    }
    const [filtered_key_val_list, set_filtered_key_val_list] = useState(init_list)

    function onFilterClick(){
        filter_options = ["Model Year", "Make", "Vehicle Type", "Trim", "Series"]
        if (document.getElementById("show_basic_attributes").checked) {
            filter_options = filter_options.concat(basic_options)
        }
        if (document.getElementById("show_performance_attributes").checked) {
            filter_options = filter_options.concat(performance_options)
        }
        if (document.getElementById("show_safety_attributes").checked) {
            filter_options = filter_options.concat(safety_options)
        }

        let new_table_data = [];
        for (let attribute of filter_options) {
            let item = {}
            item["Variable"] = attribute
            item["Value"] = key_val_obj[attribute]
            new_table_data.push(item);
        set_filtered_key_val_list(new_table_data);
        }
    }

    function onSeeAllResultsClick() {
        set_filtered_key_val_list(data_obj_list);
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/decode">VIN Decoder</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Results</Breadcrumb.Item>
            </Breadcrumb>
            <fieldset>
                <legend>Search Options</legend>
                <div>
                    <div>
                        <input type="checkbox" id="show_basic_attributes" name="show_basic_attributes"/>
                        <label htmlFor="show_basic_attributes">Get Basic Attributes</label>
                    </div>
                    <div>
                        <input type="checkbox" id="show_performance_attributes" name="show_performance_attributes"/>
                        <label htmlFor="show_performance_attributes">Get Performance Attributes</label>
                    </div>
                    <div>
                        <input type="checkbox" id="show_safety_attributes" name="show_safety_attributes"/>
                        <label htmlFor="show_safety_attributes">Get Safety Attributes</label>
                    </div>
                </div>
            </fieldset>
            <Button type="button" className="mx-3 px-5 my-3 btn-success" onClick={onFilterClick}>Filter Results</Button>
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Advanced Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={onSeeAllResultsClick}>Show All Vehicle Attributes</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 
            <b>
            <div>Search VIN: {vehicle_data["SearchCriteria"]}</div>
            <div>Data Quality: {JSON.stringify(vehicle_data["Results"][4]["Value"])}</div>
            </b>

            <div className="container">
            <Table striped hover bordered size="sm">
                <thead>
                    <tr>
                        <th style={{width: "30%"}}>Attribute</th>
                        <th style={{width: "50%"}}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered_key_val_list.map(item => <tr key={item.Variable}><td>{item.Variable}</td><td>{item.Value}</td></tr>)}
                </tbody>
            </Table>
            </div>
            {/* {JSON.stringify(vehicle_data)} */}
        </div>
    )
}

export default DecoderResultsPage;