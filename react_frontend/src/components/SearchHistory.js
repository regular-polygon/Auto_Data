import React from "react";
import { ListGroup } from "react-bootstrap";

function SearchHistory({search_history}) {
    // search_history is a list of VIN

    return (
        <div className="container my-3">
        <b><p>Search History</p></b>
        <ListGroup>
            {search_history.map((vin) => <ListGroup.Item key={vin}>{vin}</ListGroup.Item>)}
        </ListGroup>
        </div>
    )   
}

export default SearchHistory;