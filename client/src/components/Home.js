import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='home-page'>
            <Card style={{ width: '35rem', opacity: '0.9', margin: '20px auto' }}>
                <Card.Body>
                    <Card.Title style={{ fontSize: '22px' }}>Welcome!</Card.Title>
                    <Card.Text style={{ color: 'black', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
                        Explore the features of ARC and manage your evacuation operations efficiently.
                        <br/>
                        <br/>
                        Use the Main Menu to navigate throughout the app.
                        <br/>
                        <br/>
                        Before proceeding, please ensure your profile is up-to-date:
                        <br/>
                        <Link to='/my-profile'>Update Profile</Link>
                        <br/>
                        <br/>
                        A team leader or dispatcher will update the list of houses for evacuation when activated.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;