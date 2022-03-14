import { Row, Container, Button, Spinner } from "react-bootstrap"
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
      <Row>Monday</Row>
      <Row className='pt-2'>
        <CoursesList courses={meetingDays.monday} />
      </Row>
      <Row>Tuesday</Row>
      <Row>
        <CoursesList courses={meetingDays.tuesday} />
      </Row>
      <Row>Wednsday</Row>
      <Row className='pt-2'>
        <CoursesList courses={meetingDays.wednesday} />
      </Row>
      <Row>Thursday</Row>
      <Row>
        <CoursesList courses={meetingDays.thursday} />
      </Row>
      <Row>Friday</Row>
      <Row>
        <CoursesList courses={meetingDays.friday} />
      </Row>
      <Row>Saturday</Row>
      <Row>
        <CoursesList courses={meetingDays.saturday} />
      </Row>
      <Row>Sunday</Row>
      <Row>
        <CoursesList courses={meetingDays.sunday} />
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