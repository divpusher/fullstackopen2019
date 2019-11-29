import anecdoteService from '../services/anecdotes'


export const vote = (id, newObject) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, newObject)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}


export const addAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}



export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}




const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
    return action.data

    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(a =>
        a.id === id ? changedAnecdote : a
      )

    default:
      return state
  }
}


export default anecdoteReducer