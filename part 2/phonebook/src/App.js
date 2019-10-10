import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')


  useEffect(() => {     
    axios      
      .get('http://localhost:3001/persons')      
      .then(response => {             
        setPersons(response.data)      
      })  
  }, [])  


  const addPerson = (event) => {
    event.preventDefault()

    const findName = (elem) => {
      return elem.name === newName
    }

    if(persons.findIndex(findName) >= 0){
      alert(`${newName} is already added to phonebook`)
      return
    }


    const nameObject = {
      name: newName,
      number: newNumber 
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
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
      />
    </div>
  )

}

export default App