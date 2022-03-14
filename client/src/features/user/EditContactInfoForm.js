import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ErrorAlert from '../../errorHandling/ErrorAlert';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import UsStateDropdown from './UsStateDropdown';
import { customStyles, headers, getToken } from '../../Globals';
import { useDispatch, useSelector } from 'react-redux';
import { userFetchSucceeded, userUpdated, selectUserById, userLogInFetch, userFetchRejected } from './userSlice';
import { setErrors } from '../../errorHandling/errorsSlice';

const EditContactInfoForm = () => {

  const { userId } = useParams()

  const errors = useSelector(state => state.errors.entities)
  const user = useSelector(state => selectUserById(state, userId))
  const userStatus = useSelector(state => state.user.status)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [formData, setFormData ] = useState(!user ? {
    first_name: '', 
    last_name: '',
    primary_email: '',
    primary_email_confirmation: '',
    primary_phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    receive_notifications: false
  }:{
    first_name: user.first_name, 
    last_name: user.last_name,
    primary_email: user.primary_email,
    primary_email_confirmation: user.primary_email,
    primary_phone: user.primary_phone,
    address: user.address,
    city: user.city,
    state: user.state,
    zip_code: user.zip_code,
    receive_notifications: user.client_account.receive_notifications,
  })

  useEffect(() => {
    if(userStatus === 'idle' && !user) {
      dispatch({ type: "users/userLoginLoading"});
      fetch('/get-current-user', {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        }
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(data => {
            dispatch(userLogInFetch(data.user))
            dispatch(setErrors([]))
            dispatch(userFetchSucceeded())
            setFormData({
              first_name: data.user.first_name, 
              last_name: data.user.last_name,
              primary_email: data.user.primary_email,
              primary_email_confirmation: data.user.primary_email,
              primary_phone: data.user.primary_phone,
              address: data.user.address,
              city: data.user.city,
              state: data.user.state,
              zip_code: data.user.zip_code,
              receive_notifications: data.user.client_account.receive_notifications,
            })
          })
        }else{
          res.json().then(errors => {
            dispatch(userFetchRejected())
            dispatch(setErrors(errors))
          })
        }
      })
    }

  }, [userStatus, dispatch, user])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleEditContactInfoSubmit = (e) => {
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
      },
      client_account: {
        receive_notifications: formData.receive_notifications,
        id: user.client_account.id
      }
    }
    fetch(`/users/${userId}`, {
      method: "PATCH",
      headers:  {
        ...headers,
        ...getToken()
      },
      body:JSON.stringify(strongParams)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(user => {
          dispatch(userUpdated(user))
          navigate(`/users/${user.id}`)
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
     { user ? 
      <Container>
        <br></br>
        <Form>
          <Row>
            <h1>Edit Contact Information</h1>
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
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    value={formData.primary_email}
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
                  value={formData.primary_email_confirmation}
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
              onClick={e => handleEditContactInfoSubmit(e)}
            >
              Submit
            </Button>
          </Row>
        </Form> 
      </Container> : null }
    </div>
  )
}

export default EditContactInfoForm;