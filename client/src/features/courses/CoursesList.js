import { useSelector } from "react-redux";

import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const CoursesList = () =>  {

  const courses = useSelector(state => state.courses.entities)
  let navigate = useNavigate()

  const renderCourses = courses.map(course => <ListGroup.Item 
    key={course.id}
    action onClick={() => navigate(`/classes/${course.id}`)}
    >
    {course.course_list_label}
    </ListGroup.Item>
  )

  return (
    <ListGroup>
      {renderCourses}
    </ListGroup>
  )
}

export default CoursesList;