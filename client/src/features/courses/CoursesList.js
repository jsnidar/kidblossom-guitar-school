import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchCourses, selectAllCourses } from "./coursesSlice";
import { useEffect } from "react";
import { sortByDay } from "../../Globals";
import ErrorAlert from "../../errorHandling/ErrorAlert";


const CoursesList = () =>  {

  const courses = useSelector(selectAllCourses)
  const courseStatus = useSelector(state => state.courses.status)

  let navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (courseStatus === 'idle') {
      dispatch(fetchCourses())
    }
  }, [courseStatus, dispatch])

  let content

  if (courseStatus === 'loading') {
    content = <Spinner animation="border" variant="warning" />
  }else if (courseStatus === 'succeeded') {
    const sortedCourses = [...courses].sort((a, b) => {
      if (parseInt(sortByDay(a.meeting_day)) === parseInt(sortByDay(b.meeting_day))) {
        return a.start_time < b.start_time ? -1 : 1
      }else{
        return parseInt(sortByDay(a.meeting_day)) < parseInt(sortByDay(b.meeting_day)) ? -1 : 1
      }
    })
    
    const renderCourses = sortedCourses.map(course => <ListGroup.Item 
      key={course.id}
      action onClick={() => navigate(`/classes/${course.id}`)}
      >
      {course.course_list_label}
      </ListGroup.Item>
    )
    content = <ListGroup>{renderCourses}</ListGroup>
  }else if(courseStatus === 'failed'){
    content = <ErrorAlert />
  }

  return (
    <>
      {content}
    </>
  )
}

export default CoursesList;