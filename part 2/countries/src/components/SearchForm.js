import React from 'react'

const SearchForm = (props) => (
    <div>{props.text} <input 
        onChange={props.handleSearch} 
        value={props.query} 
    />
    </div>
)

export default SearchForm