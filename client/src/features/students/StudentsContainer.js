import { Container, Row, Button } from "react-bootstrap"
import { customStyles } from "../../Globals"
import { useEffect } from "react"
import StudentCard from "./StudentCard"
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./studentsSlice"
import { useNavigate } from "react-router-dom"


const StudentsContainer = () => {

  const students = useSelector(state => state.students.entities)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  
  useEffect(()=> {
    dispatch(fetchStudents())
  },[dispatch])

  const renderStudents = students.length > 0 ? students.map(student => <StudentCard 
      key={student.id}
      student={student} 
    />
  ) : null

  return (
    <Container>
      <Row className='pt-2'>
        {customStyles}
        <h2>Students</h2>
        {renderStudents}
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