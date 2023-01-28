import React from 'react'
import {Link} from 'react-router-dom'

function NavBar(){
    return (
        <div className="NavBar">
            <Link to="/" className="NavElement">Home</Link>
            <Link to="/decode" className="NavElement">VIN Decoder</Link>
            <Link to="/research" className="NavElement">Research Helper</Link>
        </div>
    )
}

export default NavBar
