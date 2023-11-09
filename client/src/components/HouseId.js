import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, ListGroup } from 'react-bootstrap';
import Notes from './Notes';
import '../styles/HouseIdButton.css';
function HouseId(){
    const {id} = useParams();
    const [house, setHouse] = useState(null);

    useEffect(() => {
        fetch(`/api/houses/${id}`)
        .then(res => res.json())
        .then(data => {
            setHouse(data);
        });
    },[id]);

    if (!house) return <div>Loading...</div>;

    return (
        <Card style={{ width: '70rem', marginTop: '100px' }}>
            <Card.Body>
                <Card.Title style={{ fontSize: '30px' }}>
                    {house.house_number} {house.street_name}, {house.city}, {house.zip_code}
                </Card.Title>

                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Latitude: {house.latitude}</ListGroup.Item>
                    <ListGroup.Item>Longitude: {house.longitude}</ListGroup.Item>
                    <ListGroup.Item>Occupants: {house.occupants}</ListGroup.Item>
                    <ListGroup.Item>Animals: {house.animals}</ListGroup.Item>
                </ListGroup>

                <Notes houseId={id} />

                <Card.Text style={{ color: 'black', fontSize: '15px' }}> 
                    Checked by:
                    <ListGroup>
                        {house.users && house.users.map((user) => (
                            <ListGroup.Item key={user.id}>{user.username}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Text>

                <Link to='/houses'>
                    <button className="bn632-hover bn28">Back</button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default HouseId;