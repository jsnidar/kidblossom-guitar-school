
import { Container, Row, Button } from "react-bootstrap"
import { customStyles } from "../../Globals"
import { useDispatch } from "react-redux"
import { studentRemoved, studentActionLoading } from "./studentsSlice"
import { baseUrl, headers, getToken, capitalizeWord } from "../../Globals";
import { useNavigate } from "react-router-dom"


const StudentCard = ({ student }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveStudent = () => {

    dispatch(studentActionLoading());
    fetch(baseUrl + `/students/${student.id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      },
    })
    .then(dispatch(studentRemoved(student.id)))
  }

  return (
    <Container>
      {customStyles}
      <Row className='border p-1 m-1'>
        <h3 className='border-bottom'>{student.full_name}</h3>
          <p>Gender: {capitalizeWord(student.gender)}</p>
          <p>Birthdate: {student.formatted_birthdate}</p>
        <Row className="justify-content-evenly">
          <Button 
            variant='yellow' 
            onClick={() => navigate(`/students/${student.id}/edit`)}
          >Edit Student Info</Button>
          <Button 
          variant='yellow' 
          onClick={() => handleRemoveStudent(student.id)} 
        >Remove Student</Button>
        </Row> 
      </Row>
  </Container>
  )
}

export default StudentCard;