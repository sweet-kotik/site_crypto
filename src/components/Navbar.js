import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

class NavbarSite extends React.Component {
    render() {
        return (
            <Navbar expland="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="light">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Главная</Nav.Link>
                            <Nav.Link as={Link} to="/sync">Синхронные</Nav.Link>
                            <Nav.Link as={Link} to="#">Асинхронные</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default NavbarSite