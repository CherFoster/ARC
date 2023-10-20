import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/checkSession";
import SignupForm from "./SignupForm";
import AuthenticationForm from "./AuthenticationForm";
import MainPage from "./MainPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);


  useEffect(() => {
    fetch("/api/check_session").then((res) => {
      if (res.ok){
        res.json().then((userData) => dispatch(setUser(userData)));
      }
    });
  }, [dispatch]);

  // if (!user) return <LoginPage onLogin={setUser} />;

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<AuthenticationForm />} />
      <Route path="/login" element={<AuthenticationForm />} />
    </Routes>
    
    
    </>
  )
  
}

export default App;
