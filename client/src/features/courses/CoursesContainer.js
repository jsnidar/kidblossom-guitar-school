import { Row, Container, Button } from "react-bootstrap"
import { customStyles } from "../../Globals"
import CourseForm from "./CourseForm"
import CourseCard from "./CourseCard"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const CoursesContainer = () => {

  let navigate = useNavigate()
  const [showCourseForm, setShowCourseForm] = useState(false)
  const courses = useSelector(state => state.courses.entities)
  const loggedIn = useSelector(state => state.user.loggedIn)

  const renderCourses = courses.length > 0 ? courses.map(course => <CourseCard 
      key={course.id}
      course={course} 
    />
  ) : null


  return (
    <Container>
      <Row className='pt-2'>
      {customStyles}
      <h2>Classes</h2>
      {renderCourses}
      {showCourseForm ? <CourseForm 
          setShowCourseForm={setShowCourseForm} 
        /> : <Button 
          variant='yellow' 
          onClick={() => setShowCourseForm(true)}
        >
          Add a Class
        </Button>
      }
      </Row>
    </Container>
  )
}

export default CoursesContainer;