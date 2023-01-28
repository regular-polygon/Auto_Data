import React from 'react';

async function onVINSearch(){
    const form = document.getElementById("vin_lookup_form");
    const formData = new FormData(form);
    const payload = {};
    for (const [key, value] of formData){
        payload[key] = value;
    }
    console.log("post payload", payload);

    const response = await fetch("/api/VINLookup", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
          }
    });

    const res_data = await response.json()
    console.log("response", res_data);
    alert("Searching!");
    const lookup_res_element = document.getElementById("lookup_res");
    lookup_res_element.innerHTML = JSON.stringify(res_data);
}

function VINDecoderPage(){
    return (
        <div>
        <h1 className='header_logo'>AutoDB</h1>
        <form id="vin_lookup_form" action="" method="get" className="vin_lookup">
            <fieldset>
                <legend>Enter target VIN</legend>
                <label htmlFor="vin_input">Vehicle Identification Number(VIN):</label>
                <input name="vin_input"/>
            </fieldset>
            <fieldset>
                <legend>Search Options</legend>
                <div>
                    <div>
                        <input type="checkbox" id="show_basic_attributes" name="show_basic_attributes"/>
                        <label htmlFor="show_basic_attributes">Get Basic Attributes</label>
                    </div>
                    <div>
                        <input type="checkbox" id="show_performance_attributes" name="show_performance_attributes"/>
                        <label htmlFor="show_performance_attributes">Get Performance Attributes</label>
                    </div>
                    <div>
                        <input type="checkbox" id="show_safety_attributes" name="show_safety_attributes"/>
                        <label htmlFor="show_safety_attributes">Get Safety Attributes</label>
                    </div>
                </div>
            </fieldset>
            <button type="button" onClick={onVINSearch}>Search!</button>
        </form>
        <div id="lookup_res"></div>
        </div>
    )
}

export default VINDecoderPage;