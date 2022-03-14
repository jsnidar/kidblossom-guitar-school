import { Container, Row, Button, Spinner, ListGroup } from "react-bootstrap"
import { customStyles } from "../../Globals"
import { useEffect } from "react"
import ErrorAlert from "../../errorHandling/ErrorAlert"
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, selectAllStudents } from "./studentsSlice"
import { useNavigate } from "react-router-dom"


const StudentsContainer = () => {

  const students = useSelector(selectAllStudents)
  const user = useSelector(state => state.user.entities[0])
  const studentStatus = useSelector(state => state.students.status)
  const dispatch = useDispatch()
  let navigate = useNavigate()


  useEffect(() => {
    if (studentStatus === 'idle') {
      dispatch(fetchStudents())
    }
  }, [studentStatus, dispatch])

  let content

  if (studentStatus === 'loading') {
    content = <Spinner animation="border" variant="warning" />
  }else if (studentStatus === 'succeeded') {
    const sortedStudents = [...students].sort((a, b) => {
      var nameA = a.full_name.toUpperCase(); 
      var nameB = b.full_name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    
    const renderStudents = sortedStudents.map(student => user && user.role === 'client' ? <ListGroup.Item 
        key={student.id}
        action onClick={() => navigate(`/students/${student.id}`)}
        >
        {student.full_name}
      </ListGroup.Item> : 
      <ListGroup.Item 
        key={student.id}
        action onClick={() => navigate(`/students/${student.id}`)}
        >
        {student.full_name} ({student.parent_name})
      </ListGroup.Item>
    )
    content = <ListGroup>{renderStudents}</ListGroup>
  }else if(studentStatus === 'failed'){
    content = <ErrorAlert />
  }

  return (
    <Container>
      <Row className='pt-2'>
        {customStyles}
        <h2>Students</h2>
        {content}
      </Row>
      <Row className="justify-content-evenly">
        <Button 
          variant='yellow' 
          onClick={() => navigate(`/`)}
        >
          Return to Dashboard
        </Button>
        <Button 
            variant='yellow' 
            onClick={() => navigate(`/students/new`)}
          >
            Add a Student
          </Button>
        </Row>
    </Container>
    
  )
}

export default StudentsContainer;