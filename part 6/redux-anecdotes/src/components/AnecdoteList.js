import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

  const handleVoteButton = (id, content) => {
    props.vote(id)
    props.addNotification(`You voted '${content}'`)

    setTimeout(() => {
      props.clearNotification()
    }, 5000)
  }


  return (
    <>
      <div>&nbsp;</div>
      {props.visibleAnecdotes.map(anecdote =>
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



const anecdotesToShow = ({ anecdotes, filter }) => {
  let filteredAnecdotes
  if (filter){
    filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }else{
    filteredAnecdotes = anecdotes
  }

  return _.orderBy(filteredAnecdotes, ['votes'], ['desc'])
}



const mapStateToProps = (state) => {
  console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}


const ConnectedAnecdoteList = connect(
  mapStateToProps,
  {
    vote,
    addNotification,
    clearNotification
  }
)(AnecdoteList)

export default ConnectedAnecdoteList