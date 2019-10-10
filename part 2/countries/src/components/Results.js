import React from 'react'

const Results = ({ results }) => {
  
  if(results.length > 10){
    return <div>Too many matches, specify another filter</div>  
  }

  if(results.length === 1){
    const elem = results[0]
    return <div key={elem.name}>
      <h1>{elem.name}</h1>
      <div>capital {elem.capital}</div>
      <div>population {elem.population}</div>
      <h2>languages</h2>
      <ul>
        {elem.languages.map(item => <li key={item.iso639_1}>{item.name}</li>)}
      </ul>
      <img src={elem.flag} alt="country flag" width="100" />
    </div>
  }

  const rows = () => results.map(elem => 
    <div key={elem.name}>{elem.name}</div>
  )
  

  return (
    <>
      {rows()}
    </>
  )
}

export default Results