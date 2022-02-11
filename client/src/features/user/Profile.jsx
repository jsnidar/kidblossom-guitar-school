
import { Container, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import StudentCard from "../students/StudentCard";
import { customStyles } from "../../Globals";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchStudents } from "../students/studentsSlice";

const Profile = () => {

  const user = useSelector(state => state.user.currentUser)
  const students = useSelector(state => state.students.entities)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(()=> {
    dispatch(fetchStudents())
  },[dispatch])

  const renderStudents = students.length > 0 ? students.map(student => <StudentCard 
    key={student.id}
    student={student} 
  />): null

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
        <p>Address: {user.address}, {user.city}, {user.state}, {user.zip_code}</p>
        <p>Phone: {user.primary_phone}</p>
        <p>Email: {user.primary_email}</p>
      </Row>
      {/* <Row className='border p-1 m-1'>
        <h3 className='border-bottom'>Account Details</h3>
        <p>Account Status: {currentUser.client_account.status}</p>
        <p>{currentUser.client_account.receive_notifications ? "I am receiving email notifications": "I am not receiving email notifications"}</p>
        <p>Current Balance: ${currentUser.client_account.balance}</p>
      </Row>  */}
      <Row className='pt-2'>
        <h2>Students</h2>
        {renderStudents}
        <Button 
            variant='yellow' 
            onClick={() => navigate(`/students/new`)}
          >
            Add a Student
          </Button>
      </Row>
    </Container>
  );
}

export default Profile;