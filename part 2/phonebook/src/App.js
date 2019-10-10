import React, { useState } from 'react'


const Persons = ({ persons, filter }) => {    
  const rowsToShow = filter
    ? persons.filter(
        (item) => {
          return item.name.toLowerCase().indexOf(filter) > -1
        })
    : persons

  const rows = () => rowsToShow.map(person => 
    <div key={person.name}>{person.name} {person.number}</div>
  )

  return (
    <div>{rows()}</div>
  )
}



const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')


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
      <div>filter shown with <input      
            value={newFilter} 
            onChange={handleFilterChange}  
        />
      </div>

      <h2>add a new</h2>
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
      <Persons persons={persons} filter={newFilter} />
    </div>
  )

}

export default App