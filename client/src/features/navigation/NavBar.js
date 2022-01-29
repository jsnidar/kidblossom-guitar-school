import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { customStyles } from '../../Globals';

const NavBar = ({ logOut, currentUser }) => {

  
  return (
      <Navbar className='navigation' bg='light' expand="lg" sticky="top">
      {customStyles}
        <Container>
          <Navbar.Brand href="/">
            {currentUser.name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
              <Button variant="blue-outline" onClick={logOut}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavBar;