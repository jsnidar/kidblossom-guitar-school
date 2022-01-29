import React, { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../App/ErrorAlert';
import { headers, customStyles } from '../../Globals';

const LogIn = ({ logIn }) => {

  let navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const [formData, setFormData ] = useState({
    password: '',
    primary_email: ''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleLogInSubmit = e => {
    e.preventDefault();

    const strongParams = {
      ...formData
    }

    fetch('/login', {
      method: "POST",
      headers,
      body: JSON.stringify(strongParams)
    })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(data => {
            logIn(data.user);
            localStorage.setItem('jwt', data.token)
            navigate('/')
          })
        }else{
          res.json().then(e => setErrors(e))
        }
      })
    }

  return (

    <Container>
    {customStyles}
      <Form className='p-2'>
        <Row>
          <h1>Log In</h1>
          { errors ? <ErrorAlert errors={errors.errors} /> : null }
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="primary_email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="text" 
                placeholder=""
                value={formData.primary_email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter password" 
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
        </Row>
        <Button 
          variant="blue" 
          type="submit"
          onClick={e => handleLogInSubmit(e)}
        >
          Submit
        </Button>
      </Form> 
    </Container>
  );
}

export default LogIn;