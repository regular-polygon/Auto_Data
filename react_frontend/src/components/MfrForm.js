import React from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { manufacturers } from "../data/manufacturers";

// autocomplete dropdown for car manufacturer selection
function MfrForm({mfr_selections, set_mfr_selections}){
    let options = manufacturers;
    const ref = React.createRef();
    return (
        <>
        <div class="container my-3">
        <Form.Group>
            <Form.Label><h2>Get Car Manufacturer Data</h2></Form.Label>
                <div class="row">
                    <div className="col-sm-10 my-auto">
                        <Typeahead
                        id="basic-typeahead-single"
                        labelKey="Mfr_Name"
                        onChange={set_mfr_selections}
                        options={options}
                        paginate={true}
                        ref={ref}
                        dropup={false}
                        placeholder="Select a Manufacturer..."
                        selected={mfr_selections}
                        />
                    </div>
                    <div class="col-sm-2">
                        <Button type="button" onClick={() => set_mfr_selections([])} className="mx-3">Clear Input</Button>
                    </div>
                </div>
        </Form.Group>
        </div>
        
        </>
    )
}

export default MfrForm