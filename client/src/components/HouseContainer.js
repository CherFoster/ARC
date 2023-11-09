import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouses } from '../redux/housesSlice';
import { Link } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';
import StatusColorList from "./StatusColorList";
import GoogleMaps from './GoogleMaps';
function HouseContainer() {
    const dispatch = useDispatch();
    const houses = useSelector(state => state.houses);
    const [sortedHouses, setSortedHouses] = useState([]);

    useEffect(() => {
        dispatch(fetchHouses());
    }, [dispatch]);

    useEffect(() => {
        // sorts the houses
        const sorted = [...houses].sort((a, b) => {
            if (a.city < b.city) return -1;
            if (a.city > b.city) return 1;
            if (a.street_name < b.street_name) return -1;
            if (a.street_name > b.street_name) return 1;
            return a.house_number - b.house_number;
        });
        setSortedHouses(sorted);
    }, [houses]);

    const evacuationStatuses = [
        {status: "Not contacted", color: 'red'},
        {status: "Evacuated", color: 'green'},
        {status: "Refused to evacuate", color: 'orange'},
        {status: "Needs assistance", color: 'purple'},
        {status: "House unoccupied", color: 'blue'},
        {status: "Unable to contact", color: 'black'},
    ];

    const handleStatusChange = async (houseId) => {
        // Find the current house
        const currentHouse = sortedHouses.find(h => h.id === houseId);
        // Determine the current status index
        const currentStatusIndex = evacuationStatuses.findIndex(s => s.status === currentHouse.evacuation_status);
        // Determine the new status index
        const newStatusIndex = (currentStatusIndex + 1) % evacuationStatuses.length;
        // Get the new status
        const newStatus = evacuationStatuses[newStatusIndex].status;
    
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
            // Update the sorted houses state immediately
            setSortedHouses(prevHouses => prevHouses.map(house => {
                if (house.id === houseId) {
                    return { ...house, evacuation_status: newStatus };
                }
                return house;
            }));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getColorForStatus = (status) => {
        const statusObj = evacuationStatuses.find(s => s.status === status);
        return statusObj ? statusObj.color : 'grey'; // Default color if status is not found
    };

    return (
        <>
            <div style={{marginBottom: '10px', marginTop: '400px'}}><GoogleMaps /></div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', background: 'white' }}>
                <div style={{ position: 'fixed', width: '300px' }}>
                    <StatusColorList />
                </div>
            <div style={{ marginLeft: '300px', flex: '1 1 auto', maxHeight: '80vh', overflowY: 'auto' }}>

            <ListGroup>
                {sortedHouses.map(house => (
                    <ListGroup.Item key={house.id} className="d-flex justify-content-between align-items-center">
                        <Link to={`/houses/${house.id}`}>
                            {house.house_number} {house.street_name}, {house.city}, {house.zip_code}
                        </Link>
                        <div 
                            style={{ 
                                height: '20px',
                                width: '20px',
                                borderRadius: '50%',
                                backgroundColor: getColorForStatus(house.evacuation_status),
                                cursor: 'pointer'
                            }}
                            onClick={() => handleStatusChange(house.id)}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            </div>
            </div>
        </>
    );
}

export default HouseContainer;