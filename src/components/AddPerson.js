import { Button, Form } from "react-bootstrap"

const AddPerson = ({ handleSubmit, handleNameInput, handleNumberInput, inputRef, newName, newNumber }) => {
  
  return (
    <div>
      <h2>add a new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>name:</Form.Label>
          <Form.Control type="text" name="name" ref={inputRef} onChange={handleNameInput} value={newName} />
          <Form.Label>number:</Form.Label>
          <Form.Control type="text" name="number" onChange={handleNumberInput} value={newNumber} />
          <Button variant="primary" type="submit">add</Button>
        </Form.Group>
      </Form> 
    </div>
  )
}

export default AddPerson