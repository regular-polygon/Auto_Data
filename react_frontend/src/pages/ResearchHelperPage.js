import React from 'react';
import {Link} from 'react-router-dom';

function ResearchHelperPage() {
    return (
        <div>
            <h1>Research Helper</h1>
            <h2>To be implemented</h2>
            <div><Link to="/research/manufacturer" className="NavElement">Research a car manufacturer</Link></div>
            <div><Link to="/research/models" className="NavElement">Research car models by year, make, and vehicle type.</Link></div>
        </div>
    )
}

export default ResearchHelperPage;