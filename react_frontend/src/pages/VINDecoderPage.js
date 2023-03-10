import React from 'react';
import {Link} from "react-router-dom"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SearchHistory from '../components/SearchHistory';
import VINDecoderForm from '../components/VINDecoderForm';

function VINDecoderPage({set_vehicle_data, search_history, set_search_history}){
    

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>VIN Decoder</Breadcrumb.Item>
            </Breadcrumb>
            <h1>VIN Decoder</h1>
            <VINDecoderForm set_vehicle_data={set_vehicle_data} set_search_history={set_search_history} search_history={search_history}/>
            <SearchHistory search_history={search_history} />
            <p style={{width: "50%", margin:"auto"}}>
                NOTE: If a decoded value is missing, that means NHTSA does not have data on that variable.
                It doesn't mean that the feature is not available for that vehicle.
            </p>
        </div>
    )
}

export default VINDecoderPage;