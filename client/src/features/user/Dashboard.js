
import { Container, Row, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customStyles } from '../../Globals';
import { selectAllUsers } from './userSlice';
const Dashboard = () => {

  const users = useSelector(selectAllUsers)
  let navigate = useNavigate()

  return (
    <Container>
      {customStyles}
      <Row>
        <h1>Dashboard</h1>
      </Row>
      { users ? 
        <Row>
          <h2>Welcome {users[0].first_name} {users[0].last_name}</h2>
        </Row> 
      : null }
      <Row className="justify-content-evenly">
          <Button 
            variant='yellow' 
            onClick={() => navigate(`/students`)}
          >View Students</Button>
        <Button 
            variant='yellow' 
            onClick={() => navigate(`/users/${users[0].id}`)}
          >View Profile</Button>
          <Button 
            variant='yellow' 
            onClick={() => navigate('/classes')}
          >View Courses</Button>
        </Row>
    </Container>
  )
}

export default Dashboard;