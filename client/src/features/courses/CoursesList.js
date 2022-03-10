import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchCourses, selectAllCourses } from "./coursesSlice";
import { useEffect } from "react";
import { sortByDay } from "../../Globals";
import ErrorAlert from "../../errorHandling/ErrorAlert";


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