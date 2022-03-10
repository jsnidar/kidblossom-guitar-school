import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CoursesList = ({ courses }) =>  {

  let navigate = useNavigate()
  
  const sortedCourses = [...courses].sort((a, b) => {
      return a.start_time < b.start_time ? -1 : 1
  })
  
  const renderCourses = sortedCourses.map(course => <ListGroup.Item 
    key={course.id}
    action onClick={() => navigate(`/classes/${course.id}`)}
    >
    {course.course_list_label}
    </ListGroup.Item>
  )
  
  return (
    <ListGroup>{renderCourses}</ListGroup>
  )
}

export default CoursesList;