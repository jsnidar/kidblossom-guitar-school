import { Form } from "react-bootstrap";

const ClientAccountsDropdown = ({ formData, handleChange, clients }) => {
  const clientOptions = clients.map(client => <option
    value={client.id}
    key={client.id}
  >{client.user.full_name}</option>)
  return (
    <Form.Group className="mb-3" controlId="client_account_id">
      <Form.Label>Client</Form.Label>
      <Form.Select value={formData.client_account_id} onChange={handleChange}>
        <option>Select Client</option>
        {clientOptions}
      </Form.Select>
    </Form.Group>
  )
}

export default ClientAccountsDropdown;