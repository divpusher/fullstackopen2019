import { useResource } from '../hooks/'


export const initUserList = (userListUrl) => {
  console.log('fetch userlist')
  return async dispatch => {
    const userlist = await useResource(userListUrl).getAll()
    dispatch({
      type: 'INIT_USERLIST',
      data: userlist,
    })
  }
}



export const clearUserList = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_USERLIST'
    })
  }
}



const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERLIST':
      return action.data

    case 'CLEAR_USERLIST':
      return []

    default:
      return state
  }
}

export default userListReducer