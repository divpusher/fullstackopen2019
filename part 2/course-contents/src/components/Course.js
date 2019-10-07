import React from 'react'


const Header = ({ title }) => (
  <h1>{title}</h1>
)


const Part = ({ part, exercises }) => (
  <p>{part} {exercises}</p>
)


const Content = ({ parts }) => (
  parts.map(part => 
    <Part part={part.name} exercises={part.exercises} key={part.id} />
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


export default Courses