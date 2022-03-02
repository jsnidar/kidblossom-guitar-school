import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ErrorAlert from '../../errorHandling/ErrorAlert';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import UsStateDropdown from './UsStateDropdown';
import { customStyles, headers } from '../../Globals';
import { useDispatch, useSelector } from 'react-redux';
import { userFetchSucceeded, userLoggedIn, userLogInFetch } from './userSlice';
import { setErrors } from '../../errorHandling/errorsSlice';

const SignUp = () => {

  const errors = useSelector(state => state.errors.entities)
  const dispatch = useDispatch()

  const [formData, setFormData ] = useState({
    first_name: '', 
    last_name: '',
    primary_email: '',
    primary_email_confirmation: '',
    primary_phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    password: '',
    password_confirmation: '',
    receive_notifications: false
  })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    const strongParams = {
      user: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        primary_email: formData.primary_email,
        primary_email_confirmation: formData.primary_email_confirmation,
        primary_phone: formData.primary_phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      },
      client_account: {
        receive_notifications: formData.receive_notifications
      }
    }
    fetch('/users', {
      method: "POST",
      headers: headers,
      body:JSON.stringify(strongParams)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(data => {
          localStorage.setItem("jwt", data.token)
          dispatch(userLogInFetch(data.user))
          dispatch(userFetchSucceeded());
        })
        .then(navigate('/'))
      }else{
        res.json().then(e => dispatch(setErrors(e)))
      }
    })
  }

  return (
    <div>
    {customStyles}
      <Container>
        <br></br>
        <Form>
          <Row>
            <h1>Sign Up</h1>
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
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Street Address</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter street address here" 
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter city here" 
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {<UsStateDropdown formData={formData} handleChange={handleChange} />}
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="zip_code">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter zip code here" 
                  value={formData.zip_code}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="phone_number">
                <Form.Label>Phone Number</Form.Label>
                <PhoneInput
                  defaultCountry="US"
                  international={false}
                  placeholder="Enter phone number"
                  value={formData.primary_phone}
                  onChange={(e) => setFormData({...formData, primary_phone: e})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
                <Form.Group className="mb-3" controlId="primary_email">
                  <Form.Label>Enter Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="primary_email_confirmation">
                <Form.Label>Confirm Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email_confirmation}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Create Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Create a password" 
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="password_confirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Confirm your password" 
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Would you like to receive email notifications from KidBlossom of upcoming events and promotions?</Form.Label>
              <Form.Switch 
                label={formData.receive_notifications ? "Yes, I would like to receive email notifications." : "No, I do not want to receive email notifications."}
                checked={formData.receive_notifications}
                onChange={() => setFormData({...formData, receive_notifications: !formData.receive_notifications})}
              />
            </Form.Group>
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

export default SignUp;