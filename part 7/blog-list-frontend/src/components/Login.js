import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import { initUser } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      props.initUser(user)

      props.initializeBlogs()

      // props.initUserList()

    } catch (exception) {

      props.setNotification('wrong username or password', 'error')

    }
  }



  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" name="username" />
      </div>
      <div>
        password
        <input type="password" name="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}


export default connect(
  null,
  {
    initUser,
    initializeBlogs,
    setNotification
  }
)(Login)