import React from "react";
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MfrDetailsTable({mfrDetails}){
    {console.log("Mfr Details", mfrDetails)}
    if (mfrDetails != null) {
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
                </>
        )
    } else {
        return <div className='NoNHTSAData'></div>
    }
}

export default MfrDetailsTable