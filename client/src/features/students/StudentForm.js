import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import { customStyles } from '../../Globals';
import { headers, getToken } from "../../Globals";
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentById, studentAdded, studentUpdated, studentFetchRejected, studentActionLoading, studentFetchSucceeded } from './studentsSlice';
import { setErrors } from '../../errorHandling/errorsSlice';
import ErrorAlert from '../../errorHandling/ErrorAlert';


const StudentForm = () => {

  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors.entities)

  const { studentId } = useParams()
  const student = useSelector(state => selectStudentById(state, studentId))
  const studentStatus = useSelector(state => state.students.status)

  const role = useSelector(state => state.user.entities[0].role)
  let navigate = useNavigate()

  const [formData, setFormData ] = useState({
    first_name: '', 
    last_name: '',
    birth_date: '',
    gender: '',
  })
 
  useEffect(()=> {
    if (studentStatus === 'idle' || !student){
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
            setFormData({...student, gender: student.gender === "female" ? 0 : 1})
            dispatch(studentFetchSucceeded())
          })
        }else{
          res.json().then(errors => {
            dispatch(setErrors(errors))
          })
        }
      })
    }
  },[studentStatus, student, studentId, dispatch])
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleCancel = () => {
    setFormData({
      first_name: '', 
      last_name: '',
      birth_date: '',
      gender: '',
      client_account: ''
    })
    studentId ? navigate(`/students/${studentId}`) : (role === 'client' ? navigate('/') : navigate('/students'))
  }
  const studentPost = (strongParams) => {

    dispatch(studentActionLoading());
    fetch('/students', {
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
        .then(student => {
          dispatch(studentAdded(student))
          navigate(`/students/${student.id}`)
        })
      }else{
        res.json().then(errors => {
          dispatch(studentFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }
  
  const studentPatch = (strongParams) => {

    dispatch(studentActionLoading());
    fetch(`/students/${student.id}`, {
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
        .then(student => {
          dispatch(studentUpdated(student))
          navigate(`/students/${studentId}`)
        })
      }else{
        res.json().then(errors => {
          dispatch(studentFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    debugger
    const strongParams = {
      student: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        gender: parseInt(formData.gender, 10),
        client_account_id: student.client_account_id
      },
    }

    studentId ? studentPatch(strongParams) : studentPost(strongParams)
  }

  return (
    <div>
    {customStyles}
      <Container className='border'>
        <br></br>
        <Form>
          <Row>
            { studentId ? <h2>Edit Student</h2> : <h2>Add Student</h2> }
            { errors.length > 0 ? <ErrorAlert errors={errors} /> : null }
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder=""
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder=""
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="birth_date">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control 
                  type="date" 
                  placeholder="Enter birthdate here" 
                  value={formData.birth_date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={formData.gender} onChange={handleChange}>
                  <option>Select gender</option>
                  <option value="1" >Male</option>
                  <option value="0" >Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
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
    </div>
  );
}

export default StudentForm;