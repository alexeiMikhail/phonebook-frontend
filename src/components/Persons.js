import Person from "./Person"
import { Table } from "react-bootstrap"

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <Table striped>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Number
            </th>
          </tr>
        </thead>
        <tbody>
          {persons?.filter(p => p.name.toLowerCase()
            .includes(filter.toLowerCase()))
            .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
            .map(p => <Person key={p.id} person={p} handleDelete={() => handleDelete(p)} />)}
        </tbody>
      </Table>
    </div>
  )
}

export default Persons