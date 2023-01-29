import React from 'react'
import {Link} from 'react-router-dom'

function NavBar(){
    return (
        <div className="NavBar">
            <h1 className='header_logo'>AutoDB</h1>
            <Link to="/" className="NavElement">Home</Link>
            <Link to="/decode" className="NavElement">VIN Decoder</Link>
            <Link to="/research" className="NavElement">Research Helper</Link>
            <Link to="/decoderresults" className="NavElement">Results</Link>

        </div>
    )
}

export default NavBar
