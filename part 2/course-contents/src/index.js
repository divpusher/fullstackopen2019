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
  const total = parts.reduce(
    (acc, currVal) => acc + currVal.exercises
    ,0
  )

  return (
    <p><b>total of {total} exercises</b></p>
  )
}


const Course = ({ course }) => (
  <div>
    <Header title={course.name} />   
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)


const Courses = ({ courses }) => (
  courses.map(course =>
    <Course key={course.id} course={course} />
  )
)



const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))