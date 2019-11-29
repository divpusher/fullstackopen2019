import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.addAnecdote(content)

    props.setNotification(`You created '${content}'`, 2000)
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


export default connect(
  null,
  {
    addAnecdote,
    setNotification
  }
)(AnecdoteForm)
