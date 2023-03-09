import {useState, useEffect, React} from "react"
import {Link, NavLink} from "react-router-dom"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Dropdown from "react-bootstrap/Dropdown"

function DecoderResultsPage({vehicle_data}) {
    if (Object.entries(vehicle_data).length == 0) {
        return (
            <p>Vehicle data not set.</p>
        )
    }
    const vehicle_data_key_val = vehicle_data["Results"][0];  // an object of vehicle attributes and values
    // const key_val_obj = {}
    // for (let item of data_obj_list) {
    //     key_val_obj[item["Variable"]] = item["Value"];
    // }

    let default_filter_options = ["ModelYear", "Make", "VehicleType", "Trim", "Series"];
    let basic_options = ["BasePrice", "BodyClass", "FuelTypePrimary"];
    let performance_options = ["TransmissionStyle", "TransmissionSpeeds", "DriveType", "EngineCylinders", "DisplacementL", "Top SpeedMPH"]
    let safety_options = ["AirBagLocCurtain", "AirBagLocFront", "AirBagLocSide", "ABS", "ESC", 
    "TractionControl", "TPMS", "AdaptiveCruiseControl", "BlindSpotMon", "ForwardCollisionWarning", "RearVisibilitySystem"];

    // // generate a minimal default results list
    // let init_list = [];
    // for (let attribute of filter_options) {
    //     let item = {}
    //     item["Variable"] = attribute
    //     item["Value"] = key_val_obj[attribute]
    //     init_list.push(item);
    // }

    
    // set up initial table data
    let init_key_val = Object.fromEntries(
        Object.entries(vehicle_data_key_val).filter(
            ([key, val]) => default_filter_options.includes(key)
        )
    )
    // the filtered_key_val_list is used to populate the html table
    const [filtered_key_val, set_filtered_key_val] = useState(init_key_val)

    // when user attempts to filter the list, update the filtered_key_val_list accordingly
    function onFilterClick(){
        let filter_options = default_filter_options
        if (document.getElementById("show_basic_attributes").checked) {
            filter_options = filter_options.concat(basic_options)
        }
        if (document.getElementById("show_performance_attributes").checked) {
            filter_options = filter_options.concat(performance_options)
        }
        if (document.getElementById("show_safety_attributes").checked) {
            filter_options = filter_options.concat(safety_options)
        }

        let new_table_data = Object.fromEntries(
            Object.entries(vehicle_data_key_val).filter(
                ([key, val]) => filter_options.includes(key)
            ).sort(
                ([key1,val1], [key2, val2]) => key1.localeCompare(key2)
            )
        )
        set_filtered_key_val(new_table_data)
    }
    
    // In advanced options, users can choose to see all available (attribute, value) pairs. 
    // This will completely undo the filter. 
    function onSeeAllResultsClick() {
        set_filtered_key_val(vehicle_data_key_val);
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
            <div>Search VIN: {vehicle_data["VIN"]}</div>
            <div>Data Quality: {JSON.stringify(vehicle_data_key_val["ErrorText"])}</div>
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
                    {Object.entries(filtered_key_val).map(entry => <tr key={entry[0]}><td>{entry[0]}</td><td>{entry[1]}</td></tr>)}
                </tbody>
            </Table>
            </div>
            {/* {JSON.stringify(vehicle_data)} */}
        </div>
    )
}

export default DecoderResultsPage;