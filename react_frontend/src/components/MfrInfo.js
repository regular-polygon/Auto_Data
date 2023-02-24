import {React, useEffect} from "react";

function MfrInfo({mfrSelections}) {

    //useEffect monitor mfrSelection
    // call API to get details

    if (mfrSelections.length > 0) {
        
        return (
            <div>
                {console.log("Mfr Info", mfrSelections)}
                <p>{JSON.stringify(mfrSelections)}</p>
            </div>
        )
    } else {
        return (<h3>Select a Manufacturer</h3>)
    }


}

export default MfrInfo;