import React, { useState } from 'react'


const Persons = ({ persons }) => {  
  const rows = () => persons.map(person => 
    <div key={person.name}>{person.name}</div>
  )

  return (
    <div>{rows()}</div>
  )
}


const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName 
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName} 
            onChange={handlePersonChange} 
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