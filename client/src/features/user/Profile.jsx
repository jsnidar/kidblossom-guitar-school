
import { Container, Row } from "react-bootstrap";
import StudentsContainer from "../students/StudentsContainer";

const Profile = ({ currentUser }) => {

  return (
    <Container>
        <Row className='pt-2'>
          <h1>Welcome {currentUser.first_name} {currentUser.last_name}</h1>
        </Row>
        <Row>
          <h2>Account Information</h2>
        </Row>
        <Row className='border p-1 m-1'>
          <h3 className='border-bottom'>Contact Information</h3>
          <p>Address: {currentUser.address}, {currentUser.city}, {currentUser.state}, {currentUser.zip_code}</p>
          <p>Phone: {currentUser.primary_phone}</p>
          <p>Email: {currentUser.primary_email}</p>
        </Row>
        {/* <Row className='border p-1 m-1'>
          <h3 className='border-bottom'>Account Details</h3>
          <p>Account Status: {currentUser.client_account.status}</p>
          <p>{currentUser.client_account.receive_notifications ? "I am receiving email notifications": "I am not receiving email notifications"}</p>
          <p>Current Balance: ${currentUser.client_account.balance}</p>
        </Row>  */}
        <StudentsContainer currentUser={currentUser} />
    </Container>
  );
}

export default Profile;