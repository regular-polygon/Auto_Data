import React from "react"
import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container";

function DecoderResultsTable({filtered_key_val}){
    return (
        <Container>
            <Table striped hover bordered size="sm">
                <thead>
                    <tr>
                        <th style={{width: "30%"}}>Attribute</th>
                        <th style={{width: "50%"}}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(filtered_key_val).map(entry => <tr key={entry[0]}>
                        <td>{entry[0]}</td>
                        <td>{entry[1]}</td>
                        </tr>)
                        }
                </tbody>
            </Table>
        </Container>
    )
}

export default DecoderResultsTable;