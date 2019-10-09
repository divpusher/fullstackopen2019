import React, { useState } from 'react'


const Persons = ({ persons }) => {  
  const rows = () => persons.map(person => 
    <div key={person.name}>{person.name} {person.number}</div>
  )

  return (
    <div>{rows()}</div>
  )
}


const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


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


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNameChange} 
            />
        </div>
        <div>
          number: <input 
            value={newNumber} 
            onChange={handleNumberChange} 
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App