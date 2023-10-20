import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../styles/SliderForm.css';

const AuthenticationForm = ({ onLogin }) => {
    const navigate = useNavigate();

    const signUpSchema = yup.object().shape({
        username: yup.string().required('Username required'),
        email: yup.string().email().required('Email required'),
        password: yup.string().required('Password required'),
        agency: yup.string().required('Agency required'),
    });

    const signInSchema = yup.object().shape({
        email: yup.string().email().required('Email required'),
        password: yup.string().required('Password required'),
    });

    const signUpFormik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            agency: '',
        },
        validationSchema: signUpSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            // ... similar logic as before ...
        }
    });

    const signInFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            // ... implement this part for signIn API endpoint ...
        }
    });

    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className={`container ${isSignUp ? "right-panel-active" : ""}`} id="container">

            {/* Sign Up Form */}
            <div className="form-container sign-up-container">
                <form onSubmit={signUpFormik.handleSubmit}>
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Username" {...signUpFormik.getFieldProps('username')} />
                    {signUpFormik.touched.username && signUpFormik.errors.username ? <div className="error">{signUpFormik.errors.username}</div> : null}
                    
                    <input type="email" placeholder="Email" {...signUpFormik.getFieldProps('email')} />
                    {signUpFormik.touched.email && signUpFormik.errors.email ? <div className="error">{signUpFormik.errors.email}</div> : null}
                    
                    <input type="password" placeholder="Password" {...signUpFormik.getFieldProps('password')} />
                    {signUpFormik.touched.password && signUpFormik.errors.password ? <div className="error">{signUpFormik.errors.password}</div> : null}
                    
                    <input type="text" placeholder="Agency" {...signUpFormik.getFieldProps('agency')} />
                    {signUpFormik.touched.agency && signUpFormik.errors.agency ? <div className="error">{signUpFormik.errors.agency}</div> : null}

                    <button type="submit">Sign Up</button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className="form-container sign-in-container">
                <form onSubmit={signInFormik.handleSubmit}>
                    <h1>Sign in</h1>
                    <input type="email" placeholder="Email" {...signInFormik.getFieldProps('email')} />
                    {signInFormik.touched.email && signInFormik.errors.email ? <div className="error">{signInFormik.errors.email}</div> : null}
                    
                    <input type="password" placeholder="Password" {...signInFormik.getFieldProps('password')} />
                    {signInFormik.touched.password && signInFormik.errors.password ? <div className="error">{signInFormik.errors.password}</div> : null}
                    
                    <button type="submit">Sign In</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={() => setIsSignUp(false)}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={() => setIsSignUp(true)}>Sign Up</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AuthenticationForm;
