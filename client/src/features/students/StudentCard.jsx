
import { Container, Col, Row, Button } from "react-bootstrap"
import StudentForm from "./StudentForm"
import { useState } from "react"
import { customStyles } from "../../Globals"
import { useDispatch } from "react-redux"
import { studentRemoved, studentActionLoading } from "./studentsSlice"
import { baseUrl, headers, getToken, formatDate } from "../../Globals";


const StudentCard = ({ student }) => {

  const [ editStudent, setEditStudent ] = useState(false)
  const dispatch = useDispatch()

  const handleRemoveStudent = () => {

    dispatch(studentActionLoading());
    fetch(baseUrl + `/students/${student.id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      },
      body: JSON.stringify(student.id)
    })
    .then(dispatch(studentRemoved(student.id)))
  }

  
  const displayStudentInfo = <Container>
    {customStyles}
    <Row className='border p-1 m-1'>
      <h3 className='border-bottom'>{student.first_name} {student.last_name}</h3>
      <Col>
        Gender: {student.gender}
        <br></br>
        Birthdate: {formatDate(student.birth_date).toDateString()}
      </Col>
      <Col>
        
      </Col>
      <Row className="justify-content-evenly">
        <Button 
          variant='yellow' 
          onClick={() => setEditStudent(true)}
        >Edit Student Info</Button>
        <Button 
        variant='yellow' 
        onClick={() => handleRemoveStudent(student.id)} 
      >Remove Student</Button>
      </Row> 
    </Row>
    
  </Container>

  return (
    <> 
      {editStudent ? <StudentForm 
          setShowStudentForm={setEditStudent} 
          studentToEdit={student} 
        /> : displayStudentInfo
      } 
    </>
  )
}

export default StudentCard;