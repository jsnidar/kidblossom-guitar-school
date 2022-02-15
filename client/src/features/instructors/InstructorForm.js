import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ErrorAlert from '../../errorHandling/ErrorAlert';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import UsStateDropdown from '../user/UsStateDropdown';
import { headers, getToken, customStyles } from '../../Globals';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors } from '../../errorHandling/errorsSlice';
import { instructorAdded, instructorActionLoading, instructorFetchRejected, instructorUpdated } from './instructorsSlice';

const InstructorForm = () => {

  const errors = useSelector(state => state.errors.entities)
  const dispatch = useDispatch()

  const { instructorId } = useParams()
  let navigate = useNavigate()
  // const instructor = useSelector(state => state.instructors.entities.find(instructor => instructor.id === parseInt(instructorId, 10)))

  useEffect(()=> {
    if (instructorId){
      fetch(`/instructors/${instructorId}`, {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        },
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(instructor => {
            // dispatch(instructorAdded(instructor))
            setFormData({
              first_name: instructor.first_name,
              last_name: instructor.last_name,
              primary_phone: instructor.primary_phone,
              address: instructor.address,
              city: instructor.city,
              state: instructor.state,
              zip_code: instructor.zip_code
            })
          })
        }else{
          res.json().then(errors => {
            dispatch(setErrors(errors))
          })
        }
      })
    }
  },[instructorId, dispatch])

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
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleCancel = () => {
    instructorId ? setFormData({
      first_name: '', 
      last_name: '',
      primary_phone: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
    }) : setFormData({
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
    })

    instructorId ? navigate(`/instructors/${instructorId}`) : navigate('/instructors')
  }

  const instructorPost = (strongParams) => {
    fetch('/instructors', {
      method: "POST",
      headers: {
        ...headers,
        ...getToken()
      },
      body:JSON.stringify(strongParams)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(instructor => {
          instructorAdded(instructor)
          navigate(`/instructors/${instructor.id}`)
        })
      }else{
        res.json().then(e => dispatch(setErrors(e)))
      }
    })
  }

  const instructorPatch = (strongParams) => {

    dispatch(instructorActionLoading());
    fetch(`/instructors/${instructorId}`, {
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
        .then(instructor => {
          dispatch(instructorUpdated(instructor))
          navigate(`/instructors/${instructor.id}`)
        })
      }else{
        res.json().then(errors => {
          dispatch(instructorFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const strongParams = instructorId ? {
      instructor: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        primary_phone: formData.primary_phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
      } 
    } : { 
      instructor: {
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
        }
      }
    instructorId ? instructorPatch(strongParams) : instructorPost(strongParams)
  }



  return (
    <div>
    {customStyles}
      <Container>
        <br></br>
        <Form>
          <Row>
            {<h1>Add Instructor</h1>}
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
              <UsStateDropdown formData={formData} handleChange={handleChange} />
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
          {!instructorId ?
            <>
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
            </> : null
          }
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

export default InstructorForm;