import { Card, Form, Button, FormGroup, Label, Input, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { updateProfileStart, updateProfileSuccess, updateProfileFailure } from "../redux/authSlice";
import { updateProfileInList } from '../redux/userProfiles';

function MyProfile() {
    const user = useSelector(state => state.auth.user);
    const [profileData, setProfileData] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`/api/users/${user.id}`)
        .then(res => res.json())
        .then(data => setProfileData(data))
        .catch(err => console.log('Error:', err));
    }, [user]);

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
                console.log('Profile updated:', data);
                dispatch(updateProfileSuccess(data));
                dispatch(updateProfileInList(data)); 
            }).catch(error => {
                console.error('Error updating profile:', error);
                dispatch(updateProfileFailure(error.message)); 
            })
        }
    });

    if (!profileData) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>{profileData.username}'s Profile</h2>
            <Form onSubmit={formik.handleSubmit}> 
                <Form.Group> 
                    <Form.Control
                        type="text"
                        name="image"
                        id="image"
                        className={formik.errors.profilePicture ? 'is-invalid' : ''}
                        {...formik.getFieldProps('image')}
                    />
                    {formik.errors.image ? (
                        <div className="invalid-feedback">{formik.errors.image}</div>
                    ) : null}
                    <Form.Label for="image">Profile Picture URL</Form.Label>
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
                    <Form.Label for="agency">Agency</Form.Label>
                </Form.Group>
{/* fix the onsubmit button, doesn't reroute back to /users */}
                <Button type="submit" variant="primary">Update Profile</Button>
            </Form>
        </div>
    );
}

export default MyProfile;