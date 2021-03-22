import './header.scss'
import Settings from '../store/settings';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            <Router>
            <Link to="/"> {Settings.SiteName} </Link>
            </Router>
        </div>
    )
}

export default Header;