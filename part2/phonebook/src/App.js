import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import entryHandlers from './services/backendComm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [inputSearched, setInputSearched] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    entryHandlers
      .getAll()
      .then(allData => {
        setPersons(allData)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (newContact.name === '') {
      return alert('The "Name" field cannot be empty')
    }

    // Update existing contact number, block duplicates or add new person
    if (persons.some(added => (added.name === newContact.name) && (added.number !== newContact.number))) {
      if (window.confirm(`${newContact.name} is already added to phonebook. Replace the old number with a new one?`)) {
        const duplicate = persons.find(person => person.name === newContact.name)
        const changedPerson = {...duplicate, number: newContact.number}
        entryHandlers
          .update(duplicate.id, changedPerson)
          .then(returnedPersons => {
            setPersons(persons.map(person => person.id != duplicate.id ? person : returnedPersons))
            setNewName('')
            setNewNumber('')
            setNotification(`Information of ${changedPerson.name} was updated`)
            setTimeout(() => {
              setNotification('')
            }, 3000);
          })
      }
    } else if(persons.some(added => (added.name === newContact.name) && (added.number === newContact.number))) {
      alert(`${newName} is already added to the phonebook.`)
    } else {
      entryHandlers
        .create(newContact)
        .then(createdEntry => {
          setPersons(persons.concat(createdEntry))
          setNewName('')
          setNewNumber('')
          setNotification(`${newContact.name} was added`)
          setTimeout(() => {
            setNotification('')
          }, 3000);
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    const input = e.target.value
    if (input === null) {
      setShowAll(true)
    } else {
      setInputSearched(input)
      setShowAll(false)
    }
  }

  const handleDisplayPersons = () => {
    if (showAll) {
      return persons
    } else {
      return persons.filter(person => person.name.search(new RegExp(inputSearched, 'i')) > -1)
    }
  }

  const deletePerson = (e) => {
    const idValue = e.target.value
    const selected = persons.find(person => person.id == idValue)
    if (window.confirm(`Do you want to delete ${selected.name} from the list?`)) {
      entryHandlers
      .deleteEntry(selected.id)
      .catch(err => {
        setError(true)
        setNotification(`Information of ${selected.name} has already been removed from server`)
        setPersons(persons.filter(person => person.id != selected.id))
        setTimeout(() => {
          setNotification('')
          setError(false)
        }, 5000);
      })
      setPersons(persons.filter(person => person.id != selected.id))
      setNotification(`${selected.name} was deleted`)
      setTimeout(() => {
        setNotification('')
      }, 3000);
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={error} />
      <Filter value={inputSearched} search={handleSearch} />
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={handleDisplayPersons()} handleDelete={deletePerson} />
    </div>
  )
}

export default App
