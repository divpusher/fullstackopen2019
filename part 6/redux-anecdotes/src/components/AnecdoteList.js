import React from 'react'
import _ from 'lodash'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

  const { anecdotes, filter } = props.store.getState()

  let filteredAnecdotes
  if (filter){
    filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }else{
    filteredAnecdotes = anecdotes
  }

  // console.log(filteredAnecdotes)

  const orderedAnecdotes = _.orderBy(filteredAnecdotes, ['votes'], ['desc'])


  const handleVoteButton = (id, content) => {
    props.store.dispatch(vote(id))
    props.store.dispatch(
      addNotification(`You voted '${content}'`)
    )

    setTimeout(() => {
      props.store.dispatch(clearNotification())
    }, 5000)
  }


  return (
    <>
      <div>&nbsp;</div>
      {orderedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                handleVoteButton(anecdote.id, anecdote.content)
              }>vote</button>
          </div>
        </div>
      )}
    </>
  )
}


export default AnecdoteList
