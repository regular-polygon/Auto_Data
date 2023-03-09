import React from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { manufacturers } from "../data/manufacturers";

function MfrForm({mfrSelections, setMfrSelections}){
    let options = manufacturers;
    const ref = React.createRef();
    return (
        <>
        <div class="container my-3">
        <Form.Group>
            <Form.Label><h2>Get Car Manufacturer Data</h2></Form.Label>
                <div class="row">
                    <div class="col-sm-10 my-auto">
                        <Typeahead
                        id="basic-typeahead-single"
                        labelKey="Mfr_Name"
                        onChange={setMfrSelections}
                        options={options}
                        paginate={true}
                        ref={ref}
                        dropup={false}
                        placeholder="Select a Manufacturer..."
                        selected={mfrSelections}
                        />
                    </div>
                    <div class="col-sm-2">
                        <Button type="button" onClick={() => setMfrSelections([])} className="mx-3">Clear Input</Button>
                    </div>
                </div>
        </Form.Group>
        </div>
        
        </>
    )
}

export default MfrForm