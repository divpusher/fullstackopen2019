
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.message

    case 'CLEAR_NOTIFICATION':
      return null

    default:
      return state
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


export default notificationReducer