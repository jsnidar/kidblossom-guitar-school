
import { Form } from "react-bootstrap";
import { useSelector } from 'react-redux'
import { selectAllStudents } from "../students/studentsSlice";

const AddStudentDropDown = ({ student , updateStudent }) => {

  const students = useSelector(selectAllStudents)
  
  const studentOptions = students.length > 0 ? students.map( (student) => <option
      value={student.id}
      key={student.id}
    >{student.full_name}</option>): null
  
  return (
    <Form.Group className="mb-3" controlId="students">
      <Form.Select value={student.id} onChange={e => updateStudent(e.target.value, student.listId)}>
        <option>Select a Student</option>
        {studentOptions}
      </Form.Select>
    </Form.Group>
  )
}

export default AddStudentDropDown;