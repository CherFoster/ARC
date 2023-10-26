import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, ListGroup } from 'react-bootstrap';
import '../styles/HouseIdButton.css';

function HouseId(){
    const {id} = useParams();
    const [house, setHouse] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch(`/api/houses/${id}`)
        .then(res => res.json())
        .then(data => {
            setHouse(data);
        });
        fetch(`/api/houses/${id}/notes`)
            .then(res => res.json())
            .then(data => {
                setNotes(data);
            });
    },[id])

    if (!house) return <div>Loading...</div>

    return (
        <Card style={{ width: '70rem'}}>
            <Card.Body>
                <Card.Title style={{fontSize: '30px'}}>{house.house_number} {house.street_name}, {house.city}, {house.zip_code}</Card.Title>
                <Card.Text style={{ color: 'black', fontSize: '23px' }}>
                    Notes:
                    {notes.map(note => (
                        <p style={{color: 'black', fontSize: '15px'}} key={note.id}>
                            <u>Details:</u> {note.details}
                            <br/> Time: {note.timestamp}
                        </p>
                    ))}
                    <p style={{color: 'black', fontSize: '15px'}}>
                        <u>Medical Conditions:</u> {notes.reduce((acc, note) => acc + note.medical_conditions + ". ", "")}
                    </p>
                </Card.Text>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Latitude: {house.latitude}</ListGroup.Item>
                    <ListGroup.Item>Longitude: {house.longitude}</ListGroup.Item>
                    <ListGroup.Item>Occupants: {house.occupants}</ListGroup.Item>
                    <ListGroup.Item>Animals:{house.animals}</ListGroup.Item>
                </ListGroup>
                <Link to='/houses'>
                    <button class="bn632-hover bn28">Back</button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default HouseId;