import './navigation.scss'

import React, { useState } from "react";

import { Nav } from 'react-bootstrap';
  
function Navigation() : JSX.Element {
    return (
    //     fxHide.lt-md="true"
    //  fxLayout="row" fxLayoutAlign="center stretch"

            <Nav activeKey="/" className="navigation">
                <Nav.Item>
                    <Nav.Link href="/"> Home </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/projects">Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
            </Nav>

    )
}

export default Navigation;