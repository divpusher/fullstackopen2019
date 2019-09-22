import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => (
    <>
        <h1>{props.title}</h1>
    </>
)


const Part = (props) => (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
)


const Content = (props) => (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
)


const Total = (props) => {  
  let n = 0
  props.parts.map(obj => n = n + obj.exercises)

  return (
    <>
      <p>Number of exercises {n}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header title={course} />   
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))