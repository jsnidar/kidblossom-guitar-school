import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import { customStyles } from '../../Globals';
import { headers, getToken } from "../../Globals";
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentById, studentAdded, studentFetchRejected, studentActionLoading, studentFetchSucceeded, studentsFetched } from './studentsSlice';
import { setErrors } from '../../errorHandling/errorsSlice';
import ErrorAlert from '../../errorHandling/ErrorAlert';
import ClientAccountsDropdown from './ClientAccountsDropdown';


const StudentForm = () => {

  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors.entities)

  const { studentId } = useParams()
  const student = useSelector(state => selectStudentById(state, studentId))
  const studentStatus = useSelector(state => state.students.status)
  const user = useSelector(state => state.user.entities[0])
  let navigate = useNavigate()
  const [clients, setClients] = useState([])

  const [formData, setFormData ] = useState(student ? 
    {...student, gender: student.gender === "female" ? 0 : 1} :
    {
      first_name: '', 
      last_name: '',
      birth_date: '',
      gender: '',
    }
  )
 
  useEffect(()=> {

    if (studentId && studentStatus === 'idle'){
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
            dispatch(studentFetchSucceeded())
            dispatch(studentAdded(student))
            setFormData({...student, gender: student.gender === "female" ? 0 : 1})
          })
        }else{
          res.json().then(errors => {
            dispatch(studentFetchRejected())
            dispatch(setErrors(errors))
          })
        }
      })
    }
  },[studentStatus, student, studentId, dispatch])

  useEffect(()=> {
    if(user && user.role !== 'client'){
      dispatch(studentActionLoading())
      fetch(`/client_accounts/`, {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        },
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(clients => setClients(clients))
        }else{
          res.json().then(errors => {
            dispatch(setErrors(errors))
          })
        }
      })
    }
  },[user, dispatch])
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleCancel = () => {
    setFormData({
      first_name: '', 
      last_name: '',
      birth_date: '',
      gender: '',

    })
    studentId ? navigate(`/students/${studentId}`) : navigate('/students')
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
          dispatch(studentFetchSucceeded())
          dispatch(studentAdded(student))
          navigate(`/students/`)
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
        .then(students => {
          dispatch(studentFetchSucceeded())
          dispatch(studentsFetched(students))
          navigate(`/students/`)
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
    const strongParams = user.role === 'client' ? {
      student: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        gender: parseInt(formData.gender, 10),
      },
    } : {
      student: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        gender: parseInt(formData.gender, 10),
        client_account_id: formData.client_account_id
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
            {clients.length > 0 ? <ClientAccountsDropdown formData={formData} clients={clients} handleChange={handleChange} /> : null}
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