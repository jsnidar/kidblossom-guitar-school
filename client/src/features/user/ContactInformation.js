
import { Row } from "react-bootstrap";

const ContactInformation = ({ user }) => {

  const formattedPhoneNumber = (phoneNumber) => `${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`

  return (
    <>
      <Row>
        <h2>Account Information</h2>
      </Row>
      <Row className='border p-1 m-1'>
        <h3 className='border-bottom'>Contact Information</h3>
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Address:</p>
        <Row className='m-2'>
        <p>{user.address}</p>
        <p>{user.city}, {user.state}, {user.zip_code}</p>
        </Row>
        <p>Phone: {formattedPhoneNumber(user.primary_phone)}</p>
        <p>Email: {user.primary_email}</p>
      </Row>
    </>
  )
}

export default ContactInformation;