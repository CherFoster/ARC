import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/checkSession";
import AuthenticationForm from "./AuthenticationForm";
import MainPage from "./MainPage";
import NavBar from "./NavBar";
import UserProfile from './UserProfile';
import MyProfile from './MyProfile';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
 

  useEffect(() => {
    fetch("/api/check_session").then((res) => {
      if (res.ok){
        res.json().then((userData) => dispatch(setUser(userData)));
      }
    });
  }, []);

  
  return (
    <>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        {!isAuthenticated && <Route path="/signup" element={<AuthenticationForm />} />}
        {isAuthenticated && <Route path="/users" element={<UserProfile />} />}
      </Routes>
    </>
  );
}

export default App;
