import { Card, ListGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouses } from '../redux/housesSlice';
import { Link, useNavigate } from "react-router-dom";

function HouseContainer() {
    const dispatch = useDispatch();
    const houses = useSelector(state => state.houses);
    const navigate = useNavigate();
    const [selectedStatuses, setSelectedStatuses] = useState({});

    const sortedHouses = [...houses].sort((a,b) => {
        if (a.city < b.city) return -1;
        if (a.city > b.city) return 1;
        if (a.street_name < b.street_name) return -1;
        if (a.street_name > b.street_name) return 1;
        return a.house_number - b.house_number;
    })

    useEffect(() => {
        dispatch(fetchHouses());
    }, [dispatch]);

    const evacuationStatuses = [
        {status: "Not contacted", color: 'red'},
        {status: "Evacuated", color: 'green'},
        {status: "Refused to evacuate", color: 'orange'},
        {status: "Needs assistance", color: 'purple'},
        {status: "House unoccupied", color: 'blue'},
        {status: "Unable to contact", color: 'black'},
    ]

    const handleStatusChange = async (houseId, newStatus) => {
        try {
            const response = await fetch(`/api/houses/${houseId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            setSelectedStatuses(prev => ({ ...prev, [houseId]: newStatus })); // Update the selected status
            dispatch(fetchHouses());
            navigate('/houses')
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <ListGroup>
            {sortedHouses.map(house => (
                <ListGroup.Item key={house.id} className="d-flex justify-content-between align-items-center">
                    <Link to={`/houses/${house.id}`}>
                        {house.house_number} {house.street_name}, {house.city}, {house.zip_code}
                    </Link>
                    <DropdownButton
                        id={`dropdown-button-drop-${house.id}`}
                        drop="down"
                        variant="secondary"
                        title={selectedStatuses[house.id] || house.evacuationStatus || 'Status'} // Use the selected status
                    >
                        {evacuationStatuses.map(status => (
                            <Dropdown.Item
                                key={status.status}
                                onClick={() => handleStatusChange(house.id, status.status)}
                                style={{ color: status.color }}
                            >
                                {status.status}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}


export default HouseContainer;