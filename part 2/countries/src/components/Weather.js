import React, { useEffect } from 'react'
import axios from 'axios'


const Weather = ({ weather, setWeather, country }) => {

  useEffect(() => { 
    axios      
      .get('http://api.weatherstack.com/current?access_key=520d3faf31d631e945935e08c10114e9&query='+country.capital)
      .then(response => {             
        setWeather({
          temp: response.data.current.temperature,
          icon: response.data.current.weather_icons[0],
          wind: response.data.current.wind_speed,
          wind_dir: response.data.current.wind_dir
        })
      }) 
  }, [setWeather, country.capital])     


  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <div><b>temperature:</b> {weather.temp} celsius</div>
      <div>{
        weather.icon &&
          <img src={weather.icon} alt="weather icon" />
      }</div>
      <div><b>wind:</b> {weather.wind} kph {weather.wind_dir} direction</div>
    </>
  )
}


export default Weather