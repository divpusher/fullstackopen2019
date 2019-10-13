import React from 'react'
import Weather from './Weather'


const CountryDetails = ({ country, weather, setWeather }) => {

  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(item => <li key={item.iso639_1}>{item.name}</li>)}
      </ul>      
      <img src={country.flag} alt="country flag" width="100" />      
      <Weather weather={weather} setWeather={setWeather} country={country} />      
    </div>
  )
}

export default CountryDetails