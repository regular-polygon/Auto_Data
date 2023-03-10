import {React, useEffect} from "react";
import Table from "react-bootstrap/Table";

function MfrInfo({mfr_selections}) {

    //useEffect monitor mfrSelection
    // call API to get details

    if (mfr_selections.length > 0) {
        return (
            <div>
                {console.log("Mfr Info", mfr_selections)}
                    <Table striped bordered hover size="sm">
                        <thead className=".th-lg">
                            <tr>
                                <th>Attribute</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(mfr_selections[0]).map((key) => {
                                if (typeof mfr_selections[0][key] != "object") {
                                    return (
                                        <tr key={key}>
                                        <td>{key}</td>
                                        <td>{mfr_selections[0][key]}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
        )
    } else {
        return (<p>Once you select a manufacturer from the dropdown, data will be displayed here.</p>)
    }


}

export default MfrInfo;