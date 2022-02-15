
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { customStyles } from "../../Globals";
import StudentsContainer from "../students/StudentsContainer";

const Profile = () => {

  const user = useSelector(state => state.user.entities[0])


  return (
    <Container>
      {customStyles}
      <Row className='pt-2'>
        <h1>Welcome {user.first_name} {user.last_name}</h1>
      </Row>
      <Row>
        <h2>Account Information</h2>
      </Row>
      <Row className='border p-1 m-1'>
        <h3 className='border-bottom'>Contact Information</h3>
        <p>Address:</p>
        <Row className='m-2'>
        <p>{user.address}</p>
        <p>{user.city}, {user.state}, {user.zip_code}</p>
        </Row>
        <p>Phone: {user.primary_phone}</p>
        <p>Email: {user.primary_email}</p>
      </Row>
      {/* <Row className='border p-1 m-1'>
        <h3 className='border-bottom'>Account Details</h3>
        <p>Account Status: {user.client_account.status}</p>
        <p>{user.client_account.receive_notifications ? "I am receiving email notifications": "I am not receiving email notifications"}</p>
        <p>Current Balance: ${user.client_account.balance}</p>
      </Row>  */}
      <StudentsContainer />
    </Container>
  );
}

export default Profile;