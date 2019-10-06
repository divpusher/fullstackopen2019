import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const MostVoted = ({index, points}) => {
  if (!index){
    return (
      <p><i>No votes yet...</i></p>
    )
  }

  return (
    <>
      <p>{anecdotes[index]}</p>
      <p><i>has {points[index]} vote(s)</i></p>
    </>
  )    
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [mostVoted, setMostVoted] = useState()

  const getRandom = (max) => {
    setSelected(Math.floor(Math.random() * max));
  }

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);

    setMostVoted(copy.indexOf(Math.max.apply(null, copy)))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p><i>has {points[selected]} vote(s)</i></p>
      <button onClick={vote}>vote</button>
      <button onClick={() => getRandom(anecdotes.length)}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVoted index={mostVoted} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)