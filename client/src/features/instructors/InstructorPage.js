import { useEffect } from "react"
import { Container, Row, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { instructorRemoved, instructorActionLoading, instructorAdded } from "./instructorsSlice"
import { setErrors } from "../../errorHandling/errorsSlice"
import { customStyles, headers, getToken } from "../../Globals";
import { useNavigate, useParams } from "react-router-dom"


const InstructorPage = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.entities[0])
  let navigate = useNavigate()
  const { instructorId } = useParams()
  
  const instructor = useSelector(state => state.instructors.entities.find(instructor => instructor.id === parseInt(instructorId, 10)))

  useEffect(()=> {
    fetch(`/instructors/${instructorId}`, {
      method: "GET",
      headers: {
        ...headers,
        ...getToken()
      },
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(instructor => {
          dispatch(instructorAdded(instructor))
        })
      }else{
        res.json().then(errors => {
          dispatch(setErrors(errors))
        })
      }
    })  },[instructorId, dispatch])

  const handleRemoveInstructor = () => {

    dispatch(instructorActionLoading());
    fetch(`/instructors/${instructor.id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      },
      body: JSON.stringify(instructor.id)
    })
    .then(dispatch(instructorRemoved(instructor.id)))
  }

  return (
    <Container>
      {instructor ? 
        <>
          {customStyles}
          <Row>
            <h1>{instructor.first_name} {instructor.last_name}</h1>
          </Row>
          <Row>
            <h3 className='border-bottom'>Contact Information</h3>
            <p>Address: {instructor.address}, {instructor.city}, {instructor.state}, {instructor.zip_code}</p>
            <p>Phone: {instructor.primary_phone}</p>
            <p>Email: {instructor.primary_email}</p>
          </Row>
          <Row className="justify-content-evenly">
              <Button 
                variant='yellow' 
                onClick={() => navigate(`/instructors/${instructor.id}/edit`)}
              >{user.id !== instructor.id ? "Update Contact Info" : "Update My Info"}</Button>
          </Row>
          <Row className='p-1 m-1'>
            <h3 className='border-bottom'>Courses</h3>
          </Row>
          <Row className="justify-content-evenly">
              {user.id !== instructor.id ? <Button 
              variant='yellow' 
              onClick={() => handleRemoveInstructor(instructor.id)} 
            >Remove Instructor</Button> : null}
            <Button 
              variant='yellow' 
              onClick={() => navigate('/instructors')}
            >Return to Instructors Page</Button>
          </Row>
        </> : null 
      }
    </Container>
  )
}

export default InstructorPage;