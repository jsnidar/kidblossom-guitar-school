import { useState } from "react"
import { Row, Button } from "react-bootstrap"
import { customStyles } from "../../Globals"
import StudentForm from "./StudentForm"
import StudentCard from "./StudentCard"
import { useSelector } from "react-redux";


const StudentsContainer = () => {

  const [showStudentForm, setShowStudentForm] = useState(false)
  const students = useSelector(state => state.students.entities)
  
  const renderStudents = students.length > 0 ? students.map(student => <StudentCard 
      key={student.id}
      student={student} 
    />
  ) : null

  return (
    <Row className='pt-2'>
    {customStyles}
    <h2>Students</h2>
    {renderStudents}
    {showStudentForm ? <StudentForm 
        setShowStudentForm={setShowStudentForm} 
      /> : <Button 
        variant='yellow' 
        onClick={() => setShowStudentForm(true)}
      >
        Add a Student
      </Button>
    }
    </Row>
  )
}

export default StudentsContainer;