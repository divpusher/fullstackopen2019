import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>{text}</button>
)


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const calcAverage = () => (
      ((good * 1) + (bad * -1)) / (good + neutral + bad)
  )

  const calcPositive = () => (
      (good / (good + neutral + bad)) * 100
  )


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {calcAverage() || 0}</p>
      <p>positive {calcPositive() || 0} %</p>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)