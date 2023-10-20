import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function MainPage() {
    return (
        <div className='main-page'>
            <Card style={{ width: '35rem', opacity: '0.8'}}>
                <Card.Img variant='top' src='https://i.postimg.cc/kXRctKFD/ARC.jpg' style={{ marginBottom: '-80px' }}/>
                <Card.Body>
                    <Card.Title style={{ fontSize: '25px' }}>Precision in chaos. Efficiency in crisis.</Card.Title>
                    <Card.Text style={{ color: 'black', fontSize: '14px', fontFamily: 'Arial, sans-serif'}}>
                        ARC is a state-of-the-art communication platform designed specifically for first responders. By streamlining evacuations, ARC ensures that in times of crisis, efficiency meets urgency, empowering rescue teams to act swiftly, decisively, and safely. Dive into a new era of rescue operations where technology amplifies precision and speed.
                        </Card.Text>
                        <Link to="/signup">
                            <Button variant="primary" size="lg" style={{ width: '100%' }}>Sign up or Log in</Button>
                        </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MainPage;
