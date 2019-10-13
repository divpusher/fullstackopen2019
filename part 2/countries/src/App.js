import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'
import SearchForm from './components/SearchForm'

const App = () => {

  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState({
    temp: '-',
    icon: '',
    wind: '-',
    wind_dir: '-'
  })

  
  const handleSearch = (event) => {
    setQuery(event.target.value)

    if(!event.target.value){
      setFilteredCountries([])
      return
    }

    const filtered = countries.filter(item => {
      if(item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1){
        return item
      }

      return null
    })
    setFilteredCountries(filtered)
  }


  const handleCountryDisplay = (index) => {    
    setFilteredCountries(Array.of(filteredCountries[index]))
    setQuery('')
  }


  useEffect(() => {     
    axios      
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')      
      .then(response => {             
        setCountries(response.data)      
      })  
  }, []) 






  return (
    <>
      <SearchForm 
        text="find countries" 
        handleSearch={handleSearch} 
        query={query}      
      />
      <Results 
        results={filteredCountries} 
        handleCountryDisplay={handleCountryDisplay} 
        weather={weather}
        setWeather={setWeather}
      />
    </>
  )

}

export default App