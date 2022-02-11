import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { customStyles, formatCourse } from '../../Globals';
import { baseUrl, headers, getToken } from "../../Globals";
import { useDispatch, useSelector } from 'react-redux';
import { courseAdded, courseUpdated, courseFetchRejected, courseActionLoading } from './coursesSlice';
import { setErrors } from '../../errorHandling/errorsSlice';
import ErrorAlert from '../../errorHandling/ErrorAlert';
import Datetime from "react-datetime"
import { useNavigate, useParams } from 'react-router-dom';

const CourseForm = () => {

  const errors = useSelector(state => state.errors.entities)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const { classId } = useParams()
  const course = useSelector(state => state.courses.currentCourse)

  useEffect(()=> {
    if (classId){
      fetch(baseUrl + `/courses/${classId}`, {
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
            setFormData(formatCourse(course))
          })
        }else{
          res.json().then(errors => {
            dispatch(setErrors(errors))
          })
        }
      })
    }
  },[classId, dispatch])

  const [formData, setFormData ] = useState({
    name: "",
    meeting_day: "",
    status: '',
    setting: '',
    start_date: '',
    start_time: ''
  })
  
  const handleCancel = () => {
    setFormData({
      name: "",
      meeting_day: "",
      status: '',
      setting: '',
      start_date: '',
      start_time: ''
    })
    classId ? navigate(`/classes/${classId}`) : navigate('/classes')
  }

  const handleChange = (e) => {
    e.target ? 
    setFormData({...formData, [e.target.id]: e.target.value}) : 
    setFormData({...formData, start_time: e._d})
  }

  const coursePost = (strongParams) => {

    dispatch(courseActionLoading());
    fetch(baseUrl + '/courses', {
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
        })
      }else{
        res.json().then(errors => {
          dispatch(courseFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }

  const coursePatch = (strongParams) => {

    dispatch(courseActionLoading());
    fetch(baseUrl + `/courses/${classId}`, {
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
          navigate(`/classes/${classId}`)
        })
      }else{
        res.json().then(errors => {
          dispatch(courseFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }

  

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const strongParams = {
      course: {
        name: parseInt(formData.name),
        meeting_day: parseInt(formData.meeting_day),
        status: parseInt(formData.status),
        setting: parseInt(formData.setting),
        start_date: formData.start_date,
        start_time: formData.start_time,
      },
    }

    classId ? coursePatch(strongParams) : coursePost(strongParams)
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