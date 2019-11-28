import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {


  let filteredAnecdotes
  if (props.filter){
    filteredAnecdotes = props.anecdotes.filter(a => a.content.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1)
  }else{
    filteredAnecdotes = props.anecdotes
  }


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


const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}


const ConnectedAnecdoteList = connect(
  mapStateToProps
)(AnecdoteList)

export default ConnectedAnecdoteList