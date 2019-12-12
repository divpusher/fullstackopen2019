import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import userListReducer from './reducers/userListReducer'


const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
  userList: userListReducer
})

const store = createStore(reducer, applyMiddleware(thunk))


export default store