import React from 'react'
import _ from 'lodash'
import AnecdoteForm from './components/AnecdoteForm'
import { vote } from './reducers/anecdoteReducer'



const App = (props) => {

  const anecdotes = props.store.getState()
  const orderedAnecdotes = _.orderBy(anecdotes, ['votes'], ['desc'])


  return (
    <div>
      <h2>Anecdotes</h2>
      {orderedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>
              props.store.dispatch(vote(anecdote.id))
            }>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App