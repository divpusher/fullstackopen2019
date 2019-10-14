import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')


  useEffect(() => {     
    personService
      .getAll()
      .then(initialPersons => {        
        setPersons(initialPersons)      
      })
  }, [])  


  const addPerson = (event) => {
    event.preventDefault()

    const findName = (elem) => {
      return elem.name === newName
    }

    if(persons.findIndex(findName) >= 0){
      alert(`${newName} is already added to phonebook`)  
      setNewName('')
      setNewNumber('')
      
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber 
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {        
        setPersons(persons.concat(returnedPerson))  
        setNewName('')
        setNewNumber('')
      })

  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toString().toLowerCase())
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {       
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id && person))
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleFilterChange={handleFilterChange} 
        newFilter={newFilter} 
      />
      
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={addPerson} 
        handleNameChange={handleNameChange} 
        newName={newName} 
        handleNumberChange={handleNumberChange} 
        newNumber={newNumber} 
      />
      
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filter={newFilter} 
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )

}

export default App