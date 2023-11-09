import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/checkSession";
import { loginSuccess, logout } from "../redux/authSlice";
import AuthenticationForm from "./AuthenticationForm";
import MainPage from "./MainPage";
import NavBar from "./NavBar";
import UserProfile from './UserProfile';
import MyProfile from './MyProfile';
import HouseContainer from './HouseContainer';
import HouseId from './HouseId';
import Home from './Home';
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetch("/api/check_session").then((res) => {
      if (res.ok){
        res.json().then((userData) => {
          dispatch(setUser(userData)); // Update sessionSlice
          dispatch(loginSuccess(userData)); // Update authSlice
          setLoading(false);
        });
      } else {
        dispatch(logout()); // Clear both sessionSlice and authSlice
        setLoading(false);
      }
    });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<AuthenticationForm />} />
        <Route path="/users" element={<UserProfile />} />
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/houses" element={<HouseContainer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/houses/:id" element={<HouseId />} />
      </Routes>
    </>
  );
}

export default App;
