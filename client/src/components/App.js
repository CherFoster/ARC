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
import HouseContainer from './HouseContainer';
import HouseId from './HouseId';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    fetch("/api/check_session").then((res) => {
      if (res.ok){
        res.json().then((userData) => {
          dispatch(setUser(userData));
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
}, []);

if (loading) return <div>Loading...</div>;

  
  return (
    <>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        {!isAuthenticated && <Route path="/signup" element={<AuthenticationForm />} />}
        {isAuthenticated && <Route path="/users" element={<UserProfile />} />}
        {isAuthenticated && <Route path="/my-profile" element={<MyProfile/>} />}
        <Route path="/houses" element={<HouseContainer />} />
        <Route path="/houses/:id" element={<HouseId />} />
      </Routes>
    </>
  );
}

export default App;
