import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../styles/SliderForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";

function AuthenticationForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const signUpSchema = yup.object().shape({
        username: yup.string().required('Username required'),
        email: yup.string().email().required('Email required'),
        password: yup.string().required('Password required'),
        agency: yup.string().required('Agency required'),
    });

    const signInSchema = yup.object().shape({
        username: yup.string().required('Username required'),
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
        onSubmit: (values, { setSubmitting, setErrors }) => {
            dispatch(loginStart()); // Dispatch start action
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
                dispatch(loginSuccess(user));  // Dispatch success action
                navigate('/');
            }).catch((error) => {
                dispatch(loginFailure(error)); // Dispatch failure action
                setErrors({ form: error.message || "An unexpected error occurred." });
            }).finally(() => {
                setSubmitting(false);
            });
        }
    });

    const signInFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            dispatch(loginStart()); // Dispatch start action
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }).then((res) => {
                setSubmitting(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(err => {
                        throw err;
                    });
                }
            }).then((user) => {
                dispatch(loginSuccess(user));  // Dispatch success action
                navigate('/');
            }).catch((error) => {
                dispatch(loginFailure(error)); // Dispatch failure action
                setErrors({ form: error.message || "An unexpected error occurred." });
            });
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
                        <h1>Welcome back</h1>
                        <p>Please log in</p>
                        <button className="ghost" id="signIn" onClick={() => setIsSignUp(false)}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Create an account</h1>
                        <p>Please sign up with your agency credentials</p>
                        <button className="ghost" id="signUp" onClick={() => setIsSignUp(true)}>Sign Up</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AuthenticationForm;
