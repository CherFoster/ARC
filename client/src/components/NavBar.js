import React from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink, Dropdown, NavItem } from 'react-bootstrap';

function NavBar({ user, setUser }){
    const navigate = useNavigate();

    function handleLogout() {
        fetch("/api/logout", {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                setUser(null)
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
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>

    )

}

export default NavBar;
