import React from 'react'

const SearchForm = (props) => (
  <div>{props.text} <input 
    onChange={props.handleSearch} 
    value={props.query} 
    placeholder="start typing..."
  />
  </div>
)

export default SearchForm