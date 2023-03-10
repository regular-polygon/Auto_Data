import React from 'react';
import Table from "react-bootstrap/Table";

function VehicleComparisonTable({car1_data, car2_data}) {
    if (car1_data == null || car2_data == null ) {
        return <></>
    } else {
        return (
            <div className="container">
            <Table striped hover bordered size="sm">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>{car1_data["Make"].concat(" ", car1_data["Model"], " ", car1_data["ModelYear"])}</th>
                        <th>{car2_data["Make"].concat(" ", car2_data["Model"], " ", car2_data["ModelYear"])}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(car1_data).map(key => <tr key={key}>
                        <td>{key}</td>
                        <td>{car1_data[key]}</td>
                        <td>{car2_data[key]}</td>
                        </tr>)}
                </tbody>
            </Table>
            </div>
        )
    }
}

export default VehicleComparisonTable;
