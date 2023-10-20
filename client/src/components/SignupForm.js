import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap'; 
import { useFormik } from "formik";
import * as yup from "yup";

function SignupForm({ onLogin }){
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup.string().required('Username required'),
        email: yup.string().email().required('Email required'),
        password: yup.string().required('Password required'),
        agency: yup.string().required('Agency required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            agency: '',
        },
        validationSchema: formSchema,
        onSubmit: (values, { setSumbitting, setErrors }) => {
            fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(err => {
                        throw err;
                    });
                }
            }).then((user) => {
                onLogin(user);
                navigate('/');
            }).catch((error) => {
                // error for all fields
                if (error.errors) {
                    setErrors(error.errors);
                } else {
                    setErrors({ form: error.message || "An unexpected error occurred." });
                }
            }).finally(() => {
                setSumbitting(false)
            });
        }
    });

    return (
        <div className='signup-box'>
            <h2>Sign Up</h2>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type='text'
                    id='username'
                    placeholder='Username'
                    value={formik.values.username}
                    required
                    onChange={formik.handleChange}/>
                </Form.Group>
                <Form.Group controlId='formEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type='email'
                    id='email'
                    placeholder='Example@email.com'
                    value={formik.values.email}
                    required
                    onChange={formik.handleChange}/>
                </Form.Group>
                <Form.Group controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    id='password'
                    placeholder='Password'
                    value={formik.values.password}
                    required
                    onChange={formik.handleChange}/>
                </Form.Group>
                <Form.Group controlId='formAgency'>
                    <Form.Label>Agency</Form.Label>
                    <Form.Control 
                    type='text'
                    id='agency'
                    placeholder='Agency'
                    value={formik.values.agency}
                    required
                    onChange={formik.handleChange}/>
                </Form.Group>
                <Button variant='outline-primary' type='submit'>
                    {formik.isSubmitting ? "Loading..." : "Sign Up"}
                </Button>
                {formik.errors && (
                    <div className="errors">
                        <ul>
                        {Object.values(formik.errors).map((error, index) => (
                            <li key={index} style={{ color: "red" }}>
                            {error}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
            </Form>
        </div>
    );

}

export default SignupForm;