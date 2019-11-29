import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

  const handleVoteButton = (id, content) => {
    const anecdoteToChange = props.visibleAnecdotes.find(a => a.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    props.vote(id, changedAnecdote)

    props.setNotification(`You voted '${anecdoteToChange.content}'`, 2000)

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
                handleVoteButton(anecdote.id)
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
  // console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}


const ConnectedAnecdoteList = connect(
  mapStateToProps,
  {
    vote,
    setNotification
  }
)(AnecdoteList)

export default ConnectedAnecdoteList