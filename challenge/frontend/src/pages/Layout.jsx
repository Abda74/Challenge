import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/header/Header.jsx";

const Layout = () => {
    return (
        <div>
            <div>
                <Header/>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;