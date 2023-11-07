import React from "react";
import GoogleMaps from './GoogleMaps'
function StatusColorList() {

    const evacuationStatuses = [
        {status: "Not contacted", color: 'red'},
        {status: "Evacuated", color: 'green'},
        {status: "Refused to evacuate", color: 'orange'},
        {status: "Needs assistance", color: 'purple'},
        {status: "House unoccupied", color: 'blue'},
        {status: "Unable to contact", color: 'black'},
    ];

    return (
        <>
            <div>
                <div style={{padding: '10px'}}>
                    <h5>Status Color Reference</h5>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {evacuationStatuses.map(({status, color}) => (
                            <li key={status} style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                                <div 
                                    style={{ 
                                        height: '15px',
                                        width: '15px',
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                        marginRight: '10px'
                                    }}
                                />
                                {status}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default StatusColorList;