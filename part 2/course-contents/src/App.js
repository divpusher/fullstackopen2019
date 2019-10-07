import React from 'react'
import Courses from './components/Course'


const App = ({ courses }) => (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
)

export default App