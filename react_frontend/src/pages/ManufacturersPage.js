import React from "react";
import {Link} from 'react-router-dom';
import Breadcrumb from "react-bootstrap/Breadcrumb";

function ManufacturersPage(){

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Research Helper</Breadcrumb.Item>
        </Breadcrumb>
        </>
    )
}

export default ManufacturersPage;