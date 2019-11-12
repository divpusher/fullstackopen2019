import React from 'react'
import _ from 'lodash'
import { vote, addAnecdote } from './reducers/anecdoteReducer'



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
      <form onSubmit={(event) =>
          props.store.dispatch(addAnecdote(event))
        }>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App