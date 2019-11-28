const getId = () => (100000 * Math.random()).toFixed(0)


export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}


export const addAnecdote = (event) => {
  event.preventDefault()

  const content = event.target.anecdote.value
  event.target.anecdote.value = ''

  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}



export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
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