import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { customStyles } from '../../Globals';

const NavBar = ({ logOut, loggedIn }) => {
    
  const loggedOutLinks = <>
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/signup">Sign Up</Nav.Link>
    <Nav.Link href="/login">Log In</Nav.Link>
  </>

  const loggedInLinks = <>
    <Nav.Link href="/">Home</Nav.Link>
    <Button variant="yellow-outline" onClick={logOut}>
      Logout
    </Button>
  </>
  
  return (
      <Navbar className='navigation' bg='light' expand="lg" sticky="top">
      {customStyles}
        <Container>
          <Navbar.Brand href="/">
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              { loggedIn ? loggedInLinks : loggedOutLinks }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavBar;