import React from 'react'

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

export default Persons