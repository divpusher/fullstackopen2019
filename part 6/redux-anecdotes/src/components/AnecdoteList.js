import React from 'react'
import _ from 'lodash'
import { vote } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {

  const anecdotes = props.store.getState()
  const orderedAnecdotes = _.orderBy(anecdotes, ['votes'], ['desc'])

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
            <button onClick={() =>
              props.store.dispatch(vote(anecdote.id))
            }>vote</button>
          </div>
        </div>
      )}
    </>
  )
}


export default AnecdoteList
