import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { customStyles } from '../../Globals';
import { userLogout, userLogoutStatus } from '../user/userSlice';

const NavBar = () => {

  const userStatus = useSelector(state => state.user.status)
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(userLogout([]))
    localStorage.removeItem('jwt')
    dispatch(userLogoutStatus())

  }

  const loggedOutLinks = <>
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/signup">Sign Up</Nav.Link>
    <Nav.Link href="/login">Log In</Nav.Link>
  </>

  const loggedInLinks = <>
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/classes">Classes</Nav.Link>
    <Nav.Link href="/instructors">Instructors</Nav.Link>
    <Nav.Link href='/students'>Students</Nav.Link>
    <Nav.Link href="/">
      <Button variant="yellow-outline" onClick={logOut}>
        Logout
      </Button>
    </Nav.Link>
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
              { userStatus === 'succeeded' ? loggedInLinks : loggedOutLinks }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavBar;