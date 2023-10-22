import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/checkSession";
import AuthenticationForm from "./AuthenticationForm";
import MainPage from "./MainPage";
import NavBar from "./NavBar";
import UserProfile from './UserProfile';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("/api/check_session").then((res) => {
      if (res.ok){
        res.json().then((userData) => dispatch(setUser(userData)));
      }
    });
  }, [dispatch]);

  // if (!user) return <AuthenticationForm onLogin={setUser} />;

  return (
    <>
    {user && <NavBar/>}
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<AuthenticationForm />} />
      <Route path="/users" element={<UserProfile/>} />
    </Routes>
    
    
    </>
  )
  
}

export default App;
