import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Navbar.css';
import { userToken } from '../State';
import { useRecoilState } from 'recoil';
import { logUserOut } from '../api/Firebase';

const Navbar = () => {

    const [user, setUser] = useRecoilState(userToken);

    const location = useLocation();

    let path = location.pathname;
    path = path.replace("/", "");
    path = path.charAt(0).toUpperCase() + path.slice(1);

    return (

        <div className={user !== 'none' ? "nav-container" : "nav-container hide"}>
            <p className="nav-item header">{path}</p>
            <p className="nav-item footer" onClick={() => { logUserOut() }}>Logout</p>
        </div>

    );
}

export default Navbar;