import React from 'react';

const styles = {
    statusContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '5px'
    },
    statusDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        display: 'inline-block'
    }
};

const statusColors = {
    "Not contacted": "#FF0000",          // Red
    "Evacuated": "#00FF00",              // Green
    "Refused to evacuate": "#FFA500",    // Orange
    "Needs assistance": "#FFFF00",       // Yellow
    "House unoccupied": "#808080",       // Gray
    "Unable to contact": "#000000"       // Black
};

const status_options = [
    "Not contacted",
    "Evacuated",
    "Refused to evacuate",
    "Needs assistance",
    "House unoccupied",
    "Unable to contact"
];
function EvacuationStatus() {
    return (
        <div>
            {status_options.map(status => (
                <div key={status} style={styles.statusContainer}>
                    <span style={{ ...styles.statusDot, backgroundColor: statusColors[status] }}></span>
                    {status}
                </div>
            ))}
        </div>
    );
}

export default EvacuationStatus;