import React from 'react';
import Table from 'react-bootstrap/Table'

function MfrWiki({mfrInfoBox}){
    if (mfrInfoBox != null) {
        return (
            <>
            {JSON.stringify(mfrInfoBox)}
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(mfrInfoBox).map((key) => {
                        if (typeof mfrInfoBox[key] != "object") {
                            return (
                                <tr key={key}>
                                <td>{key}</td>
                                <td>{mfrInfoBox[key]}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
            </>
        )
    } else {
        return <p>Info Box not available</p>
    }
}

export default MfrWiki