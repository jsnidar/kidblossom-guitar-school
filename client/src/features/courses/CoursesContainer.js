import { Row, Container, Button } from "react-bootstrap"
import { customStyles } from "../../Globals"
import CoursesList from "./CoursesList";
import { useNavigate } from "react-router-dom";


const CoursesContainer = () => {

  let navigate = useNavigate()

  return (
    <Container>
      <Row>
        <h2>Classes</h2>
      </Row>
      <Row>
        <Button 
          variant='yellow' 
          onClick={() => navigate('/classes/new')}
        >
          Add a Class
        </Button>
      </Row>
      <Row className='pt-2'>
      {customStyles}
      <CoursesList />
      </Row>
    </Container>
  )
}

export default CoursesContainer;