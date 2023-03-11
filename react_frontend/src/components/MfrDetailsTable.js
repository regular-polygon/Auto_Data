import React from "react";
import Table from "react-bootstrap/Table";

// renders data table on ManufacturersPage
function MfrDetailsTable({mfr_details}){
    {console.log("Mfr Details", mfr_details)}
    if (mfr_details != null) {
        return (
                <>
                <h3>NHTSA Manufacturer Data</h3>
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(mfr_details["Results"][0]).map((key) => {
                            if (typeof mfr_details["Results"][0][key] != "object") {
                                return (
                                    <tr key={key}>
                                    <td>{key}</td>
                                    <td>{mfr_details["Results"][0][key]}</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
                </>
        )
    } else {
        return <div className='NoNHTSAData'></div>
    }
}

export default MfrDetailsTable