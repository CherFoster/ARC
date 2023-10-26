import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileSuccess, updateProfileFailure } from "../redux/authSlice";
import { updateProfileInList } from '../redux/userProfiles';

function MyProfile() {
    const user = useSelector(state => state.auth.user);
    const [profileData, setProfileData] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/api/users/${user.id}`)
        .then(res => res.json())
        .then(data => setProfileData(data))
    }, [user]);
    // allows for one or the other (agency or photo) to be changed
    useEffect(() => {
        if (profileData) {
            formik.setValues({
                image: profileData.image || "",
                agency: profileData.agency || ""
            });
        }
    }, [profileData]);

    const formSchema = yup.object().shape({
        image: yup.string().url(),
        agency: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            image: profileData?.image || "",
            agency: profileData?.agency || "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }).then(res => res.json())
            .then(data => {
                dispatch(updateProfileSuccess(data));
                dispatch(updateProfileInList(data));
                navigate('/users');
            }).catch(error => {
                console.error('Error updating profile:', error);
                dispatch(updateProfileFailure(error.message)); 
            })
        }
    });

    if (!profileData) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <Row>
                {/* Profile Card */}
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={profileData.image || 'default_image_url'} />
                        <Card.Body>
                            <Card.Title>{profileData.username}'s Profile</Card.Title>
                            <Card.Text>
                                Agency: {profileData.agency}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
    
                {/* Profile Form */}
                <Col md={8}>
                    <h2 style={{color: 'white'}}>Edit Profile</h2>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="image"
                                id="image"
                                className={formik.errors.image ? 'is-invalid' : ''}
                                {...formik.getFieldProps('image')}
                            />
                            {formik.errors.image ? (
                                <div className="invalid-feedback">{formik.errors.image}</div>
                            ) : null}
                            <Form.Label htmlFor="image" style={{color: 'gray'}}>Profile Picture URL</Form.Label>
                        </Form.Group>
    
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="agency"
                                id="agency"
                                className={formik.errors.agency ? 'is-invalid' : ''}
                                {...formik.getFieldProps('agency')}
                            />
                            {formik.errors.agency ? (
                                <div className="invalid-feedback">{formik.errors.agency}</div>
                            ) : null}
                            <Form.Label htmlFor="agency" style={{color: 'gray'}}>Agency</Form.Label>
                        </Form.Group>
    
                        <Button type="submit" variant="primary">Update Profile</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default MyProfile;