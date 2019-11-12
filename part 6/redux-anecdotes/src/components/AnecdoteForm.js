import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(event) =>
          props.store.dispatch(addAnecdote(event))
        }>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}


export default AnecdoteForm
