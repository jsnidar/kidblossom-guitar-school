import { useEffect } from "react"
import { Container, Row, Button } from "react-bootstrap"
import { customStyles } from "../../Globals"
import { useDispatch, useSelector } from "react-redux"
import { studentRemoved, selectStudentById, studentActionLoading, studentAdded, studentFetchSucceeded, studentFetchRejected } from "./studentsSlice"
import { setErrors } from "../../errorHandling/errorsSlice"
import { headers, getToken, capitalizeWord } from "../../Globals";
import { useNavigate, useParams } from "react-router-dom"


const StudentPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { studentId } = useParams()

  const student = useSelector(state => selectStudentById(state, studentId))
  const studentStatus = useSelector(state => state.students.status)  


  useEffect(()=> {
    if(studentStatus === 'idle' || !student) {
      dispatch(studentActionLoading())
      fetch(`/students/${studentId}`, {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        },
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(student => {
            dispatch(studentAdded(student))
            dispatch(studentFetchSucceeded())
          })
        }else{
          res.json().then(errors => {
            dispatch(setErrors(errors))
            dispatch(studentFetchRejected())
          })
        }
      })
    }  },[student, studentStatus, studentId, dispatch])

  const handleRemoveStudent = () => {

    dispatch(studentActionLoading());
    fetch(`/students/${student.id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      },
    })
    .then( e => {
      dispatch(studentFetchSucceeded())
      dispatch(studentRemoved(student.id))
      navigate('/students')
    })
  }

  return (
    <>
      { student ? <Container>
        {customStyles}
        <Row className='border p-1 m-1'>
          <h3 className='border-bottom'>{student.first_name} {student.last_name}</h3>
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
        <Row className="justify-content-evenly">
          <Button 
            variant='yellow' 
            onClick={() => navigate(`/students`)}
          >Return to Students</Button>
        <Button 
            variant='yellow' 
            onClick={() => navigate(`/`)}
          >Return to Profile</Button>
        </Row>
      </Container> :null}
    </>
  )
}

export default StudentPage;