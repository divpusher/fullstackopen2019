import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => (
  <h1>{props.title}</h1>
)


const Part = (props) => (
  <p>{props.part} {props.exercises}</p>
)


const Content = ({ parts }) => (
  parts.map(part => 
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  )
)  


const Total = ({ parts }) => {  
  let n = 0
  parts.map(obj => n = n + obj.exercises)

  return (
    <p><b>total of {n} exercises</b></p>
  )
}


const Course = ({ course }) => (
  <div>
    <Header title={course.name} />   
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)



const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }


  return (
    <div>
      <Course course={course} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))