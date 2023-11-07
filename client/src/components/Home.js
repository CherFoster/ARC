import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function Home() {


    return (
        <div className='home-page'>
            <Card style={{ width: '35rem', opacity: '0.9', margin: '20px auto' }}>
                <Card.Body>
                    <Card.Title style={{ fontSize: '22px' }}>Welcome!</Card.Title>
                    <Card.Text style={{ color: 'black', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
                        Explore the features of ARC and manage your evacuation operations efficiently.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;