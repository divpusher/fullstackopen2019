
export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        message
      }
    })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds)
  }
}


export const addNotification = (message) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message
    }
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
      return action.data.message

    case 'CLEAR_NOTIFICATION':
      return null

    default:
      return state
  }
}

export default notificationReducer