import React from 'react';
import Table from 'react-bootstrap/Table'

function MfrWikiTable({mfrInfoBox}){
    if (mfrInfoBox != null) {
        return (
            <>
            <h3>Wikipedia Data</h3>
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
        return <div className='NoInfoBox'></div>
    }
}

export default MfrWikiTable