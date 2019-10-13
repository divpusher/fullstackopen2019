import React from 'react'
import CountryDetails from './CountryDetails'


const Results = ({ results, handleCountryDisplay }) => {

  if(results.length > 10){
    return <div>Too many matches, specify another filter</div>  
  }

  if(results.length === 1){
    return <CountryDetails country={results[0]} />    
  }
  

  let showResults = results.map((elem, index) => 
    <div key={elem.name}>{elem.name}  
      <button onClick={() => handleCountryDisplay(index)}>show</button>
    </div>
  )
  

  return (
    <>
      {showResults}
    </>
  )
}

export default Results