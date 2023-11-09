import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { NavLink, Dropdown, NavItem } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
function NavBar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        fetch("/api/logout", {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                dispatch(logout());
                navigate("/signup")
            }
        });
    }

    return (
        <>
            <img className="banner" alt='banner' src='https://i.postimg.cc/6pFjbwt6/ARC-removebg-preview1.png' style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '200px' 
            }} />
            <Dropdown as={NavItem}  style={{
                position: 'absolute',
                top: '0',
                right: '0',
                fontSize: '1.7em'
            }}>
                <Dropdown.Toggle as={NavLink}>Main Menu</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/home">Home</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/houses">Evac List</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/my-profile">My Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/users">Profiles</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default NavBar;
