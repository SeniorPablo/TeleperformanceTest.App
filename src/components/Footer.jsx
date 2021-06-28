import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

export default function Footer() {
    return (
        <Navbar expand="lg" variant="light" bg="light" fixed="bottom">
            <Container className="justify-content-center">
                <Navbar.Brand href="#">
                    Juan Pablo González David - Full Stack Developer - 2021
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
