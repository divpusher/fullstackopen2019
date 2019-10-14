import React from 'react'

const Persons = ({ persons, filter, handleDeletePerson }) => {    

  const rowsToShow = filter
    ? persons.filter(
        (item) => {
          return item.name.toLowerCase().indexOf(filter) > -1
        })
    : persons

  const rows = () => rowsToShow.map(person => 
    <div key={person.id}>{person.name} {person.number} 
      <button 
        onClick={() => handleDeletePerson(person.id, person.name)}
      >delete</button>
    </div>
  )

  return (
    <div>{rows()}</div>
  )
  
}

export default Persons