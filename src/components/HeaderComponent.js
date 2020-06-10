import React, { Component } from 'react';
import { Navbar, Button, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <Navbar light color="white" style={{ borderBottom: '1px ridge' }}>
                <NavbarBrand className="mr-auto" href="/">
                    <h2>Algorithm Visualizer and Comparator</h2>
                </NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavLink className="nav-link" to="/Algorithm_Visualizer/home">
                            <Button className="button"
                                onClick={() => {
                                }}>Visualization</Button>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/Algorithm_Visualizer/Compare">
                            <Button className="button"
                                color="primary"
                                onClick={() => {
                                }}>Comparison</Button>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;