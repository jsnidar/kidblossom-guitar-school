import React from 'react'
import { Form } from 'react-bootstrap'

const UsStateDropdown = ({formData, handleChange }) => {
  const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

  const stateOptions = states.map( (state, index) => <option
      value={state}
      key={index}
    >{state}</option>)
  return (
    <Form.Group className="mb-3" controlId="state">
      <Form.Label>State</Form.Label>
      <Form.Select value={formData.state} onChange={handleChange}>
        <option>Select state</option>
        {stateOptions}
      </Form.Select>
    </Form.Group>
  )
}

export default UsStateDropdown;