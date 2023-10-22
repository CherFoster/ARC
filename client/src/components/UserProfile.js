import { Card, ListGroup } from 'react-bootstrap';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfilesBegin, fetchUserProfilesSuccess, fetchUserProfilesFailure } from '../redux/userProfiles';
import '../styles/UsersList.css';

function UserProfile(){
    const dispatch = useDispatch()
    const profiles = useSelector(state => state.userProfiles.profiles);
    const status = useSelector(state => state.userProfiles.status);
    const error = useSelector(state => state.userProfiles.error);

    useEffect(() => {
        // dispatch(fetchUserProfilesBegin());
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                dispatch(fetchUserProfilesSuccess(data));
            })
            .catch(error => {
                dispatch(fetchUserProfilesFailure(error.message));
            });
    }, [dispatch]);

    return(
        <div className='user-background'>
        <div className="profiles-container">
            {profiles.map(profile => (
            <Card key={profile.id}>
                <Card.Img variant="top" src={profile.image || "https://www.pipefreeze.co.uk/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-1024x1024.png"} />
                <Card.Body>
                    <Card.Title>{profile.username}</Card.Title>
                    <Card.Text>{profile.agency}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{profile.email}</ListGroup.Item>
                </ListGroup>
                </Card>
                ))}
        </div>
        </div>
    )
}

export default UserProfile;