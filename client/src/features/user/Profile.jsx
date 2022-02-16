
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { customStyles } from "../../Globals";
import StudentsContainer from "../students/StudentsContainer";
import ContactInformation from "./ContactInformation";
import { selectUserById, verifyLoggedIn } from "./userSlice";

const Profile = () => {

  const { userId } = useParams()
  
  const user = useSelector(state => selectUserById(state, userId))
  const userStatus = useSelector(state => state.user.status)
  const dispatch = useDispatch()


  useEffect(() => {
    if(userStatus === 'idle' && !user) {
      dispatch(verifyLoggedIn())
    }

  }, [userStatus, dispatch, user])

  return (
    <>
      {user ? <Container>
        {customStyles}
          <Row className='pt-2'>
          <h1>Profile</h1>
          </Row>
          <ContactInformation user={user} />
          { user.role === 'client' ? <Row className='border p-1 m-1'>
            <h3 className='border-bottom'>Account Details</h3>
            <p>Account Status: {user.client_account.status}</p>
            <p>{user.client_account.receive_notifications ? "I am receiving email notifications": "I am not receiving email notifications"}</p>
            <p>Current Balance: ${user.client_account.balance}</p>
          </Row> : null}
          { user.role === 'client' ? <StudentsContainer /> : null }
      </Container> : <Container></Container> }
    </>
  );
}

export default Profile;