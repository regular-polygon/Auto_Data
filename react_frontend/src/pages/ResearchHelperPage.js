import React from 'react';
import {Link} from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function ResearchHelperPage() {
    return (
        <div>
            <h1>Research Helper</h1>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Research Helper</Breadcrumb.Item>
            </Breadcrumb>
            <div><Link to="/research/manufacturers" className="NavElement">Research a car manufacturer</Link></div>
            <div><Link to="/research/comparevehicles" className="NavElement">Compare Two Vehicles by VIN</Link></div>
        </div>
    )
}

export default ResearchHelperPage;