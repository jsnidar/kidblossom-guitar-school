import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { customStyles } from '../../Globals';
import { userLoggedIn } from '../user/userSlice';

const NavBar = ({ logOut, loggedIn }) => {

  const user = useSelector(state => state.user.currentUser)
    
  const loggedOutLinks = <>
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/signup">Sign Up</Nav.Link>
    <Nav.Link href="/login">Log In</Nav.Link>
  </>

  const loggedInLinks = <>
    <Nav.Link href="/">Home</Nav.Link>
    { user.role === 1 || user.role === 2 ? <Nav.Link href="/courses">Classes</Nav.Link> : null}
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