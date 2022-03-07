
import AddStudentDropDown from "./AddStudentDropDown";
import { Row, Col, Button } from "react-bootstrap";

const AddStudent = ({addedStudents, removeStudent, updateStudent, student }) => {

  return (
    <Row>
      <Col>
        <AddStudentDropDown key={student.listId} addedStudents={addedStudents} student={student} updateStudent={updateStudent} />
      </Col>
      <Col>
        <Button
          onClick={() => removeStudent(student)} 
          variant='outline-dark'
        >x</Button>
      </Col>
    </Row>
  )
}

export default AddStudent;