import React from "react";
import { Table } from "react-bootstrap";

function MfrDetailsTable({mfrDetails}){
    {console.log("Mfr Details", mfrDetails)}
    if (mfrDetails != null) {
        return (
            <div className='container-fluid'>
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(mfrDetails["Results"][0]).map((key) => {
                            if (typeof mfrDetails["Results"][0][key] != "object") {
                                return (
                                    <tr key={key}>
                                    <td>{key}</td>
                                    <td>{mfrDetails["Results"][0][key]}</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
            </div>
        )
    } else {
        return <p>No details available.</p>
    }
}

export default MfrDetailsTable