import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ErrorAlert from '../../App/ErrorAlert';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import { customStyles } from '../../Globals';

const NewStudentForm = ({ }) => {

  const [errors, setErrors] = useState(null)
  const [formData, setFormData ] = useState({
    first_name: '', 
    last_name: '',
    birth_date: '',
    gender: '',
  })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    setErrors(null)
    const strongParams = {
      student: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        gender: formData.gender  
      },
    }
    fetch('/students', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(strongParams)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(data => {
          // logIn(data.user)
          localStorage.setItem("jwt", data.token)
        })
        .then(navigate('/'))
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  console.log(formData)
  return (
    <div>
    {customStyles}
      <Container className='border'>
        <br></br>
        <Form>
          <Row>
            <h1>New Student Form</h1>
            { errors ? <ErrorAlert errors={errors} /> : null }
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
              <Form.Group className="mb-3" controlId="birthdate">
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
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button 
              variant="yellow" 
              type="submit"
              onClick={e => handleSignUpSubmit(e)}
            >
              Submit
            </Button>
          </Row>
        </Form> 
      </Container>
    </div>
  );
}

export default NewStudentForm;