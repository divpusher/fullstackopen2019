import React from 'react'


const CountryDetails = ({ country }) => (

    <div key={country.name}>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(item => <li key={item.iso639_1}>{item.name}</li>)}
      </ul>
      <img src={country.flag} alt="country flag" width="100" />
    </div>
)

export default CountryDetails