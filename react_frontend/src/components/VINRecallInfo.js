import React from "react"
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table'

// render the accordion display of tables containing recall events
function VINRecallInfo({recall_data}){
    if (recall_data == null || recall_data["count"] < 1) {
        return (
            <p><b>No Recall Alerts Found</b></p>
        )
    } else {
        return (
            <>
            {/* <p>{JSON.stringify(recall_data)}</p> */}
            <h2>Recall Alerts</h2>
            <Accordion className="mb-5">
                {
                recall_data["results"].map(
                    (entry) => <Accordion.Item eventKey={entry["Manufacturer"].concat(entry["Component"], entry["NHTSACampaignNumber"])} className="mx-5">
                        <Accordion.Header>{entry["ReportReceivedDate"].concat(" ", entry["Manufacturer"], " ", entry["Component"])}</Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover size="sm" responsive>
                                <tbody>
                                {Object.keys(entry).map(
                                    key => <tr>
                                        <td>{key}</td>
                                        <td>{entry[key]}</td>
                                    </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                    )
                }
            </Accordion>
            </>
        )
    }
}

export default VINRecallInfo;