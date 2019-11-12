import React from 'react'
import _ from 'lodash'


const App = (props) => {

  const anecdotes = props.store.getState()
  const orderedAnecdotes = _.orderBy(anecdotes, ['votes'], ['desc'])


  const vote = (id) => {
    props.store.dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    })
  }


  const addAnecdote = (event) => {
    event.preventDefault()

    let newId = (100000 * Math.random()).toFixed(0)
    props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: event.target.anecdote.value,
        id: newId,
        votes: 0
      }
    })
  }


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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App