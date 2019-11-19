import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {


  const handleSubmit = (event) => {
    props.store.dispatch(
      addNotification(`You created '${event.target.anecdote.value}'`)
    )
    props.store.dispatch(addAnecdote(event))

    setTimeout(() => {
      props.store.dispatch(clearNotification())
    }, 5000)
  }


  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(event) =>
          handleSubmit(event)
        }>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}


export default AnecdoteForm
