import React from 'react';
import Table from 'react-bootstrap/Table'

function MfrWikiTable({mfr_infobox}){
    if (mfr_infobox != null) {
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
                    {Object.keys(mfr_infobox).map((key) => {
                        if (typeof mfr_infobox[key] != "object") {
                            return (
                                <tr key={key}>
                                <td>{key}</td>
                                <td>{mfr_infobox[key]}</td>
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