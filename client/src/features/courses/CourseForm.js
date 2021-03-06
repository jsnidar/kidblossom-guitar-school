import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { customStyles, formatCourse, headers, getToken} from '../../Globals';
import { useDispatch, useSelector } from 'react-redux';
import { courseAdded, courseUpdated, coursesFetchRejected, courseActionLoading, selectCourseById, coursesFetchSucceeded } from './coursesSlice';
import { setErrors } from '../../errorHandling/errorsSlice';
import ErrorAlert from '../../errorHandling/ErrorAlert';
import Datetime from "react-datetime"
import AddStudent from './AddStudent';
import { useNavigate, useParams } from 'react-router-dom';
import { studentActionLoading, studentFetchRejected, studentFetchSucceeded, studentsFetched, selectAllStudents } from '../students/studentsSlice';

const CourseForm = () => {

  const dispatch = useDispatch()
  let navigate = useNavigate()
  const { classId } = useParams()

  const user = useSelector(state => user)
  const errors = useSelector(state => state.errors.entities)
  const students = useSelector(selectAllStudents)
  const studentStatus = useSelector(state => state.students.status)

  const course = useSelector(state => selectCourseById(state, classId))
  const courseStatus = useSelector(state => state.courses.status)
  
  const [listId, setListId] = useState(1)
  const [addedStudents, setAddedStudents] = useState([])
  const [formData, setFormData ] = useState({
    name: "",
    meeting_day: "",
    status: '',
    setting: '',
    start_date: '',
    start_time: '',
    level: '',
    students: []
  })

  useEffect(()=> {
    if(studentStatus === 'idle') {
      dispatch(studentActionLoading())
      fetch(`/students/`, {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        },
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(students => {
            dispatch(studentsFetched(students))
            dispatch(studentFetchSucceeded())
          })
        }else{
          res.json().then(errors => {
            dispatch(setErrors(errors))
            dispatch(studentFetchRejected())
          })
        }
      })
    }
  },[studentStatus, students, dispatch])

  useEffect(()=> {
    
    if (courseStatus === 'idle' && classId){
      dispatch(courseActionLoading())
      fetch(`/courses/${classId}`, {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        },
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(course => {
            dispatch(coursesFetchSucceeded())
            dispatch(courseAdded(course))
          })
        }else{
          res.json().then(errors => {
            dispatch(setErrors(errors))
          })
        }
      })
    }

  },[courseStatus, classId, course, dispatch])

  if(course && addedStudents.length < 1) {
    let initialListId = 0
    const formattedCourse = formatCourse(course)
    const studentsWithListIds = course.students.map(student => {
      initialListId++
      return {
        listId: initialListId, 
        full_name: student.full_name, 
        student_id: student.id, 
        course_id: classId,
        student_course_id: student.student_courses.find(crs => crs.course_id === course.id).id
      }
    })
    setAddedStudents(studentsWithListIds.map(student => student.student_id))
    setFormData({...formattedCourse, students: studentsWithListIds})
    setListId(initialListId)
  }

  const handleCancel = () => {
    setFormData({
      name: "",
      meeting_day: "",
      status: '',
      setting: '',
      start_date: '',
      start_time: '',
      level: '',
      students: []
    })
    setAddedStudents([])
    setListId(1)
    classId ? navigate(`/classes/${classId}`) : navigate('/classes')
  }

  const addStudent = () => {
    setListId(listId + 1)
    setFormData({...formData, students: [
      ...formData.students, {
        listId: listId + 1, 
        full_name: '', 
        student_id: '', 
      }
    ]})
  }

  const updateStudent = (id, listId) => {
    const newStudent = students.find(student => student.id === parseInt(id, 10))
    const added = []
    const updatedStudents = formData.students.map(student => {
      if (student.listId === listId) {
        const studentObj = {
          listId: listId,
          full_name: newStudent.full_name,
          student_id: newStudent.id,
        }
        added.push(studentObj.student_id)
        return studentObj
      }else{
        added.push(student.student_id)
        return student
      }
    })
    setAddedStudents(added)
    setFormData({...formData, students: updatedStudents})
  }

  const removeStudent = (studentToRemove) => {
    if (!course || (course && !course.students.find(student => student.id === studentToRemove.student_id))) {
      setFormData({...formData, students: formData.students.filter((student) => student !== studentToRemove)})
    }else{      
      const updatedStudents = formData.students.map( student => {
        if(student.student_id === studentToRemove.student_id) {
          return {id: studentToRemove.student_course_id, _destroy: '1'}
        }else{
          return student
        }
      })
      setFormData({...formData, students: updatedStudents})
    }
    setAddedStudents([...addedStudents.filter(id => id !== studentToRemove.id)])
  }

  const renderStudents = formData.students.filter(student => student.listId !== undefined).map(student => <AddStudent
    key={student.listId}
    student={student}
    updateStudent={updateStudent}
    removeStudent={removeStudent}
    addedStudents={addedStudents}
    />)

  const handleChange = (e) => {
    e.target ? 
    setFormData({...formData, [e.target.id]: e.target.value}) : 
    setFormData({...formData, start_time: e._d})
  }

  const coursePost = () => {
    
    const strongParams = {
      course: {
        name: parseInt(formData.name),
        meeting_day: parseInt(formData.meeting_day),
        status: parseInt(formData.status),
        setting: parseInt(formData.setting),
        start_date: formData.start_date,
        start_time: formData.start_time,
        level: parseInt(formData.level),
        student_courses_attributes: formData.students
      },
    }

    dispatch(courseActionLoading());
    fetch('/courses', {
      method: "POST",
      headers: {
        ...headers,
        ...getToken()
      },
      body: JSON.stringify(strongParams)
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(course => {
          dispatch(courseAdded(course))
          dispatch(setErrors([]));
          navigate(`/classes/${course.id}`)
          dispatch(coursesFetchSucceeded())
        })
      }else{
        res.json().then(errors => {
          dispatch(coursesFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }

  const coursePatch = () => {
    const existingIds = course.students.map(student => student.id)
    const strongParams = {
      course: {
        name: parseInt(formData.name),
        meeting_day: parseInt(formData.meeting_day),
        status: parseInt(formData.status),
        setting: parseInt(formData.setting),
        start_date: formData.start_date,
        start_time: formData.start_time,
        level: parseInt(formData.level),
        student_courses_attributes: formData.students.filter(student => !existingIds.includes(student.student_id))
      },
    }
    dispatch(courseActionLoading());
    fetch(`/courses/${classId}`, {
      method: "PATCH",
      headers: {
        ...headers,
        ...getToken()
      },
      body: JSON.stringify(strongParams)
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(course => {
          dispatch(courseUpdated(course))
          dispatch(setErrors([]))
          dispatch(coursesFetchSucceeded())
          navigate(`/classes/${classId}`)
        })
      }else{
        res.json().then(errors => {
          dispatch(coursesFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    classId ? coursePatch() : coursePost()
    setAddedStudents([])
    setListId(1)
  }

  return (
    <>
      {customStyles}
      <Container className='border'>
        <br></br>
        <Form>
          <Row>
            { course ? <h2>Edit Class</h2> : <h2>Add Class</h2> }
            { errors.length > 0 ? <ErrorAlert errors={errors} /> : null }
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Select value={formData.name} onChange={handleChange}>
                  <option>Select Name</option>
                  <option value="0">30 Minute Group Lesson</option>
                  <option value="1">15 Minute Group Lesson</option>
                  <option value="2">30 Minute Private Lesson</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="level">
                <Form.Label>Level</Form.Label>
                <Form.Select value={formData.level} onChange={handleChange}>
                  <option>Select Level</option>
                  <option value="0">Step One</option>
                  <option value="1">Reading Book</option>
                  <option value="2">Tunes 1</option>
                  <option value="3">Tunes 2</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="meeting_day">
                <Form.Label>Day of the Week</Form.Label>
                <Form.Select value={formData.meeting_day} onChange={handleChange}>
                  <option>Select Day</option>
                  <option value="0">Sunday</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="setting">
                <Form.Label>Setting</Form.Label>
                <Form.Select value={formData.setting} onChange={handleChange}>
                  <option>Select Setting</option>
                  <option value="0">Online</option>
                  <option value="1">In-person</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select value={formData.status} onChange={handleChange}>
                  <option>Select Status</option>
                  <option value="0">Current</option>
                  <option value="1">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <Form.Control 
                type="date" 
                value={formData.start_date}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="start_date">
              <Form.Label>Meeting Time</Form.Label>
              <br></br>
              <Datetime
                timeConstraints={{minutes: {step: 5}}}
                dateFormat={false}
                onChange={handleChange}
                value={formData.start_time}
               />
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Label>Students</Form.Label>
            {renderStudents}
          </Row>
          <Row>
            <Button variant='yellow' onClick={addStudent}>Add Student</Button>
          </Row>
          <Row className="justify-content-evenly">
            <Button 
              variant="yellow" 
              type="submit"
              onClick={e => handleSubmit(e)}
            >
              Submit
            </Button>
            <Button 
              variant="yellow" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            </Row>
        </Form>
      </Container>
    </>
  );
}

export default CourseForm;