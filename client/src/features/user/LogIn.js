import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../errorHandling/ErrorAlert';
import { useDispatch, useSelector } from 'react-redux';
import { customStyles } from '../../Globals';
import { logInFetch } from './userSlice';

const LogIn = () => {

  const errors = useSelector(state => state.errors.entities)
  const userStatus = useSelector(state => state.user.status)

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData ] = useState({
    password: '',
    primary_email: ''
  })

  useEffect (() => {
    if (userStatus === 'succeeded') {
      navigate('/')
    }
  }, [userStatus, navigate])
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleLogInSubmit = e => {
    e.preventDefault();
    const strongParams = {
      ...formData
    }
    dispatch(logInFetch(strongParams))
  }
  
  return (

    <Container>
    {customStyles}
      <Form className='p-2'>
        <Row>
          <h1>Log In</h1>
          { errors.length > 0 ? <ErrorAlert errors={errors.errors} /> : null }
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
          variant="yellow" 
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