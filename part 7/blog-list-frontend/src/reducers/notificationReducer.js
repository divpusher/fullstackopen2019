
export const setNotification = (message, type, seconds = 3000) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        message,
        type
      }
    })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds)
  }
}



export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}



const notificationReducer = (state = null, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return {
        message: action.data.message,
        type: action.data.type
      }

    case 'CLEAR_NOTIFICATION':
      return null

    default:
      return state
  }
}

export default notificationReducer