import { Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../Globals"; 

const Home = () => {

  let navigate = useNavigate()
  return (
    <Container>
      {customStyles}
      <Row>
        <h1>KidBlossom Guitar School of Central Texas</h1>
        <p>Welcome to KidBlossom Guitar School of Central Texas.</p>
        <p>We specialize in teaching children. The KidBlossom Program was made for young people age 5 and up. You can feel confident that your children will be given the best opportunity to learn, grow and cultivate their talent.</p>
        <p>The KidBlossom Program cultivates a habit of performance in the class, for family, in our outdoor, “sound oasis” teams, open mics, and eventually on the concert stage in recitals.</p>
      </Row>
      <Row>
        <p>Use the buttons below to log in to your acount or sign up for one.</p>
      </Row>
      <Row className="justify-content-evenly">
        <Button variant='yellow' onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button variant='yellow' onClick={() => navigate('/login')}>Log In</Button>
      </Row>
    </Container>
  )
}

export default Home;