
import { Container, Row } from "react-bootstrap";
import LogIn from "./LogIn";

const Profile = ({ currentUser, logIn }) => {

  return (
    <Container>
    { currentUser ?
      <>
        <Row className='pt-2'>
          <h1>Welcome {currentUser.first_name} {currentUser.last_name}</h1>
        </Row>
        <Row>
          <h2>Account Information</h2>
        </Row>
        <Row className='border p-1'>
          <h3 className='border-bottom'>Contact Information</h3>
          <p>Address: {currentUser.address}, {currentUser.city}, {currentUser.state}, {currentUser.zip_code}</p>
          <p>Phone: {currentUser.primary_phone}</p>
          <p>Email: {currentUser.primary_email}</p>
        </Row>
        <Row>
        </Row>  
      </>
      : <LogIn logIn={logIn} /> }
    </Container>
  );
}

export default Profile;