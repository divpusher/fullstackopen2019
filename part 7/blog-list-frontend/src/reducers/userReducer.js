
export const initUser = (user) =>{
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}


export const exitUser = (user) =>{
  return dispatch => {
    dispatch({
      type: 'EXIT_USER'
    })
  }
}




const userReducer = (state = null, action) => {

  switch (action.type) {
    case 'SET_USER':
      return action.data

    case 'EXIT_USER':
      return null

    default:
      return state
  }

}


export default userReducer