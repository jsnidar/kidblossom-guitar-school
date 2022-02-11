import { Container, Button } from "react-bootstrap"
import { useEffect } from "react"
import { customStyles } from "../../Globals"
import InstructorsList from "./InstructorsList"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { fetchInstructors } from "./instructorsSlice"

const InstructorsContainer = () => {

  let navigate = useNavigate() 
  const dispatch = useDispatch()
  
  useEffect(()=> {
    dispatch(fetchInstructors())
  },[dispatch])

  
  return (
    <Container>
    {customStyles}
    <h2>Instructors</h2>
    <Button 
        variant='yellow' 
        onClick={() => navigate('/instructors/new')}
      >
        Add Instructor
      </Button>
      <InstructorsList />
    </Container>
  )
}

export default InstructorsContainer;