import { Row, Col, Container, Button, Spinner } from "react-bootstrap"
import { customStyles } from "../../Globals"
import CoursesList from "./CoursesList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCourses, fetchCourses } from "./coursesSlice";
import ErrorAlert from "../../errorHandling/ErrorAlert";

const CoursesContainer = () => {

  let navigate = useNavigate()
  const courses = useSelector(selectAllCourses)
  const courseStatus = useSelector(state => state.courses.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (courses.length < 1 && courseStatus === 'idle') {
      dispatch(fetchCourses())
    }
  }, [courseStatus, courses, dispatch])

  let content

  if (courseStatus === 'loading') {
    content = <Spinner animation="border" variant="warning" />
  }else if (courseStatus === 'succeeded') {
    
    const meetingDays = { 
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }

    courses.map(course => meetingDays[course.meeting_day].push(course))

    content = <>
      <Row>
        <h2>Classes</h2>
      </Row>
      <Row>
        <Button 
            variant='yellow' 
            onClick={() => navigate('/')}
          >
            Return to Dashboard
          </Button>
        <Button 
          variant='yellow' 
          onClick={() => navigate('/classes/new')}
        >
          Add a Class
        </Button>
      </Row>
      <Row>

      </Row>
      <Row>
        <Col>
          <Row>Monday</Row>
          <Row className='overflow-auto'>
            <CoursesList courses={meetingDays.monday} />
          </Row>
        </Col>
        <Col>
          <Row>Tuesday</Row>
          <Row className='overflow-auto'>
            <CoursesList courses={meetingDays.tuesday} />
          </Row>
        </Col>
        <Col>
          <Row>Wednesday</Row>
          <Row className='pt-2'>
            <CoursesList courses={meetingDays.wednesday} />
          </Row>
        </Col>
        <Col>
          <Row>Thursday</Row>
          <Row>
            <CoursesList courses={meetingDays.thursday} />
          </Row>
        </Col>
        <Col>
          <Row>Friday</Row>
          <Row>
            <CoursesList courses={meetingDays.friday} />
          </Row>
        </Col>
        <Col>
          <Row>Saturday</Row>
          <Row>
            <CoursesList courses={meetingDays.saturday} />
          </Row>
        </Col>
        <Col>
          <Row>Sunday</Row>
          <Row>
            <CoursesList courses={meetingDays.sunday} />
          </Row>
        </Col>
      </Row>
    </>
  }else if(courseStatus === 'failed'){
    content = <ErrorAlert />
  }

  return (
    <Container>
      {customStyles}
      {content}
    </Container>
  )
}

export default CoursesContainer;