import { useState } from "react"
import { Row, Button } from "react-bootstrap"
import { customStyles } from "../../Globals"
import NewStudentForm from "./NewStudentForm"

const StudentsContainer = () => {
  const [showNewStudentForm, setShowNewStudentForm] = useState(false)
  return (
    <Row>
    {customStyles}
      <h3>Students</h3>
      {showNewStudentForm ? <NewStudentForm /> : <Button variant='yellow' onClick={() => setShowNewStudentForm(!showNewStudentForm)}>Add a Student</Button>}
    </Row>
  )
}

export default StudentsContainer;