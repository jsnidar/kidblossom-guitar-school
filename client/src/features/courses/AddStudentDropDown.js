
import { Form } from "react-bootstrap";
import { selectAllStudents } from "../students/studentsSlice";
import { useSelector } from "react-redux";

const AddStudentDropDown = ({ student , updateStudent, addedStudents }) => {

  const students = useSelector(selectAllStudents)

  const studentOptions = students.length > 0 ? students.map((std) => {
    if(std.id === student.student_id){
      return <option
        value={student.student_id}
        key={student.student_id}
      >{student.full_name}</option>
    }else if(!addedStudents.includes(std.id)){
      return <option
        value={std.id}
        key={std.id}
      >{std.full_name}</option>
    }
  }): null
  return (
    <Form.Group className="mb-3" controlId="students">
      <Form.Select value={student.student_id} onChange={e => updateStudent(e.target.value, student.listId)}>
        <option>Select a Student</option>
        {studentOptions}
      </Form.Select>
    </Form.Group>
  )
}

export default AddStudentDropDown;