import { useState, useEffect, useRef } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Form from './components/AddPerson'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])
  
  const handleNameInput = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value)
  }



  const handleUpdate = (match) => {
    if (!window.confirm(`${newName} is already in the phonebook, change number?`)) {
      handleNotification(`${newName} not added`, 'danger')
      return
    }
    console.log(match)
    const changedPerson = {...match, number: newNumber}
    console.log(match.id)
    personService
      .update(match.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== match.id ? p : returnedPerson))
        handleNotification(`Updated ${returnedPerson.name}`, 'success')
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        handleNotification(`Error: ${match.name} was already deleted from server`, 'danger')
        setPersons(persons.filter(p => p.id !== match.id))
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    inputRef.current.select()

    if (!newName) {
      handleNotification(`Please enter a name`, 'danger')
      return
    }

    if (!newNumber) {
      handleNotification('Please enter a number', 'danger')
      return
    }
    console.log(persons)
    const match = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (match) {
      handleUpdate(match)
      return
    }

    const newPerson = {name: newName, number: newNumber}

    personService
      .create(newPerson)
      .then(returnedPerson => {
        console.log('returned person', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        handleNotification(`Added ${returnedPerson.name} to phonebook`, 'success')
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        handleNotification(`${err.response.data.error}`, 'danger')
        console.log(err.response.data.error)
      })
  }

  const handleDelete = (person) => {
    if (! window.confirm(`Delete ${person.name}?`)) {
      handleNotification(`Did not delete ${person.name}`, 'danger')
      return
    }

    personService
      .deleteItem(person.id)
      .then(res => {
        handleNotification(`Deleted ${person.name}`, 'success')
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handleNotification = (message, type) => {
    setNotification({message: message, type: type})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <Form handleSubmit={handleSubmit} 
        handleNameInput={handleNameInput} 
        handleNumberInput={handleNumberInput} 
        inputRef={inputRef} 
        newName={newName} 
        newNumber={newNumber} />
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App