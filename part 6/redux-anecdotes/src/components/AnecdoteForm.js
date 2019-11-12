import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
  return (
    <form onSubmit={(event) =>
        props.store.dispatch(addAnecdote(event))
      }>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  )
}


export default AnecdoteForm
