import { Container, Col, Row, Button } from "react-bootstrap"
import CourseForm from "./CourseForm"
import { useState } from "react"
import { customStyles } from "../../Globals"
import { useDispatch } from "react-redux"
import { courseRemoved, courseActionLoading } from "./coursesSlice"
import { baseUrl, headers, getToken } from "../../Globals";


const CourseCard = ({ course }) => {

  const [ editCourse, setEditCourse ] = useState(false)
  const dispatch = useDispatch()

  const handleRemoveCourse = () => {

    dispatch(courseActionLoading());
    fetch(baseUrl + `/courses/${course.id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      },
      body: JSON.stringify(course.id)
    })
    .then(dispatch(courseRemoved(course.id)))
  }

  const timeString = new Date(course.start_time).toLocaleTimeString()
  const formattedTimeString = timeString.length === 11 ? timeString.slice(0, 5) + timeString.slice(8) : timeString.slice(0, 4) + timeString.slice(7)
  const formatCourseName = (string) => {
    let name = string.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1))
    name[name.length - 1] = "Minutes"
    return name.join(" ")
  }
  const displayCourseInfo = <Container>
    {customStyles}
    <Row className='border p-1 m-1'>
      <h3 className='border-bottom'>{formatCourseName(course.name)}</h3>
      <Col>
        <p>
          Meeting Day: {course.meeting_day}
        </p>
        <p>
          Start Date: {new Date(course.start_date).toDateString()}
        </p>
        <p>
          Time: {formattedTimeString}
        </p>
      </Col>
      <Col>
        <p>
          Class Setting: {course.setting}
        </p>
        <p>
          Class Status: {course.status}
        </p>
      </Col>
      <Row className="justify-content-evenly">
        <Button 
          variant='yellow' 
          onClick={() => setEditCourse(true)}
        >Edit Class Info</Button>
        <Button 
        variant='yellow' 
        onClick={() => handleRemoveCourse(course.id)} 
      >Remove Class</Button>
      </Row> 
    </Row>
    
  </Container>

  return (
    <> 
      {editCourse ? <CourseForm 
          setShowCourseForm={setEditCourse} 
          courseToEdit={course} 
        /> : displayCourseInfo
      } 
    </>
  )
}

export default CourseCard;