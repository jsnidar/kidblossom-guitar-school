import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InstructorsList = () =>  {

  const instructors = useSelector(state => state.instructors.entities)
  let navigate = useNavigate()

  const renderInstructors = instructors.map(instructor => <ListGroup.Item 
    key={instructor.id}
    action onClick={() => navigate(`/instructors/${instructor.id}`)}
    >
    {instructor.full_name}
    </ListGroup.Item>
  )

  return (
    <ListGroup>
      {renderInstructors}
    </ListGroup>
  )
}

export default InstructorsList;