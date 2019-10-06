import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>{text}</button>
)


const Statistic = (props) => {
  return (
    <>
      <tr><td>{props.text}</td><td>{props.value}</td></tr>
    </>
  )
}


const Statistics = (props) => {

  if (props.good + props.neutral + props.bad === 0){
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  const calcAverage = () => (
      ((props.good * 1) + (props.bad * -1)) / (props.good + props.neutral + props.bad)
  )

  const calcPositive = () => (
      (props.good / (props.good + props.neutral + props.bad)) * 100
  )

  return (
    <table>
      <tbody>      
        <Statistic text="good" value={props.good} />  
        <Statistic text="neutral" value={props.neutral} />  
        <Statistic text="bad" value={props.bad} />  
        <Statistic text="all" value={props.good + props.neutral + props.bad} />  
        <Statistic text="average" value={calcAverage()} />  
        <Statistic text="positive" value={calcPositive() + ' %'} />  
      </tbody>
    </table>
  )

}


const App = () => {

  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}


ReactDOM.render(<App />, 
  document.getElementById('root')
)