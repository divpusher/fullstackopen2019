import React from 'react'
import { connect } from 'react-redux'

import { Form, Responsive, Container, Button } from 'semantic-ui-react'

import loginService from '../services/login'
import { initUser } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initUserList } from '../reducers/userListReducer'


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

      props.initUserList('/api/users')

    } catch (exception) {

      props.setNotification('wrong username or password', 'error')

    }
  }



  return (
     <Responsive as={Container} textAlign="center">
        <h2>Log in to application</h2>

        <Form onSubmit={handleLogin} style={{ maxWidth: 300, margin: '0px auto' }}>
          <Form.Input
            icon='user'
            iconPosition='left'
            name='username'
            placeholder='Username'
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            name='password'
            type='password'
            placeholder='Password'
          />

          <Button content='Login' primary />
        </Form>
    </Responsive>
  )
}


export default connect(
  null,
  {
    initUser,
    initializeBlogs,
    setNotification,
    initUserList,
  }
)(Login)