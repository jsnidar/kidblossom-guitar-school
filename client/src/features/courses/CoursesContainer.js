import { Row, Container, Button } from "react-bootstrap"
import { customStyles } from "../../Globals"
import CoursesList from "./CoursesList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "./coursesSlice";


const CoursesContainer = () => {

  const courses = useSelector(state => state.courses.entities)
  let navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fetchCourses())
  },[dispatch])

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
      {courses && courses.length > 0 ?
      <Row className='pt-2'>
      {customStyles}
      
      <CoursesList />
      </Row> : null }
    </Container>
  )
}

export default CoursesContainer;