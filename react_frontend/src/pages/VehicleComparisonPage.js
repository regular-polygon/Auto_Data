import {React, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import VehicleComparisonTable from "../components/VehicleComparisonTable";
import VehicleComparisonForm from "../components/VehicleComparisonForm";

function VehicleComparisonPage({vehicle_data, set_vehicle_data}){
    const [car1_data, set_car1_data] = useState(null)
    const [car2_data, set_car2_data] = useState(null)

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/research">Research Helper</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Compare Vehicles</Breadcrumb.Item>
            </Breadcrumb>

            <VehicleComparisonForm vehicle_data={vehicle_data} set_car1_data={set_car1_data} set_car2_data={set_car2_data}/>
            <VehicleComparisonTable car1_data={car1_data} car2_data={car2_data}/>
        </>
    )
}

export default VehicleComparisonPage