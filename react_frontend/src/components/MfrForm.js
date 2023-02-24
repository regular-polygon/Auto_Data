import React from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { manufacturers } from "../data/manufacturers";

function MfrForm({mfrSelections, setMfrSelections}){
    let options = manufacturers;
    return (
        <Form.Group>
            <Form.Label>List of NHTSA Manufacturers</Form.Label>
            <Typeahead
            id="basic-typeahead-single"
            labelKey="Mfr_Name"
            onChange={setMfrSelections}
            options={options}
            placeholder="Select a Manufacturer..."
            selected={mfrSelections}
            />
        </Form.Group>
    )
}

export default MfrForm