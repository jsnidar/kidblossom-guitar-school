import { Container, Col, Row, Button, ListGroup } from "react-bootstrap"
import { useEffect } from "react"
import { customStyles, formatDate } from "../../Globals"
import { useDispatch, useSelector } from "react-redux"
import { courseRemoved, courseActionLoading, courseAdded, selectCourseById, coursesFetchSucceeded, courseFetchRejected } from "./coursesSlice"
import { setErrors } from "../../errorHandling/errorsSlice"
import { headers, getToken, capitalizeWord } from "../../Globals"
import { useNavigate, useParams } from "react-router-dom"


const CourseCard = () => {

  const { classId } = useParams()

  const course = useSelector(state => selectCourseById(state, classId))
  const courseStatus = useSelector(state => state.courses.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {
    if (courseStatus === 'idle' && !course) {
      dispatch(courseActionLoading())
      fetch(`/courses/${classId}`, {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        },
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(courseInfo => {
            dispatch(courseAdded(courseInfo))
            dispatch(coursesFetchSucceeded())
          })
        }else{
          res.json().then(errors => {
            dispatch(setErrors(errors))
            dispatch(courseFetchRejected())
          })
        }
      }) 
    } 
  },[courseStatus, classId, course, dispatch])

  const handleRemoveCourse = () => {

    dispatch(courseActionLoading());
    fetch(`/courses/${course.id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      },
      body: JSON.stringify(course.id)
    })
    .then(dispatch(courseRemoved(course.id)))
  }

  let timeString
  let formattedTimeString
  
  if(course) {
    timeString = new Date(course.start_time).toLocaleTimeString()
    formattedTimeString = timeString.length === 11 ? timeString.slice(0, 5) + timeString.slice(8) : timeString.slice(0, 4) + timeString.slice(7)
  }
  
  const formatCourseName = (string) => {
    let name = string.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1))
    name[name.length - 1] = "Minutes"
    return name.join(" ")
  }

  const renderStudents = course ? course.students.map(student => {
    return <ListGroup.Item key={student.id} action onClick={() => navigate(`/students/${student.id}`)}>{student.full_name}</ListGroup.Item>
  }) : null

  console.log(course)
  return (
    <Container>
      {customStyles}
      {course ? <Row className='border p-1 m-1'>
        <h3 className='border-bottom'>{formatCourseName(course.name)}</h3>
        <Col>
          <p>
            Meeting Day: {capitalizeWord(course.meeting_day)}
          </p>
          <p>
            Start Date: {formatDate(course.start_date).toDateString()}
          </p>
          <p>
            Time: {formattedTimeString}
          </p>
        </Col>
        <Col>
          <p>
            Instructor: {course.instructor_name}
          </p>
          <p>
            Level: {course.course_level}
          </p>
          <p>
            Class Setting: {capitalizeWord(course.setting)}
          </p>
          <p>
            Class Status: {capitalizeWord(course.status)}
          </p>
        </Col>
        <Row>Students</Row>
        <Row>
          <ListGroup>{renderStudents.length > 0 ? renderStudents: null}</ListGroup>
        </Row>

        <Row className="justify-content-evenly">
          <Button 
            variant='yellow' 
            onClick={() => navigate(`/classes/${classId}/edit`)}
          >Edit Class Info</Button>
          <Button 
            variant='yellow' 
            onClick={() => handleRemoveCourse(course.id)} 
          >Remove Class</Button>
          <Button 
            variant='yellow' 
            onClick={() => navigate('/classes')}
          >Return to Courses Page</Button> 
        </Row>
      </Row> : null}
    </Container>
  )
}

export default CourseCard;