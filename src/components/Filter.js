import { Form } from "react-bootstrap"

const Filter = ({ filter, handleFilter }) => {
  
  return (
    <Form>
      <Form.Group>
        <Form.Label>filter shown with: </Form.Label>
        <Form.Control
          type="text"
          name="filter"
          onChange={handleFilter} 
          value={filter} ></Form.Control>
      </Form.Group>
    </Form>
    
  )
}

export default Filter