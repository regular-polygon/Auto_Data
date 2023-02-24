import {React, useEffect} from "react";
import Table from "react-bootstrap/Table";

function MfrInfo({mfrSelections}) {

    //useEffect monitor mfrSelection
    // call API to get details

    if (mfrSelections.length > 0) {
        return (
            <div>
                {console.log("Mfr Info", mfrSelections)}
                <div className='container-fluid'>
                    <Table striped bordered hover size="sm" responsive>
                        <thead>
                            <tr className="same-col-widths">
                                <th>Attribute</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(mfrSelections[0]).map((key) => {
                                if (typeof mfrSelections[0][key] != "object") {
                                    return (
                                        <tr key={key}>
                                        <td>{key}</td>
                                        <td>{mfrSelections[0][key]}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    } else {
        return (<h3>Once you select a manufacturer from the dropdown, data will be displayed here.</h3>)
    }


}

export default MfrInfo;