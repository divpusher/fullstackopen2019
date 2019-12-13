import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { Header, Icon } from 'semantic-ui-react'

import Menu from './components/Menu'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddNewBlog from './components/AddNewBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import { initializeBlogs, clearBlogs } from './reducers/blogReducer'
import { initUser, exitUser } from './reducers/userReducer'
import { initUserList, clearUserList } from './reducers/userListReducer'



const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (props.user === null && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      props.initUser(user)

      props.initializeBlogs()

      props.initUserList('http://localhost:3003/api/users')
    }
    console.log('first render')
  }, [props])


  const handleLogout = () => {
    props.exitUser()
    props.clearBlogs()
    props.clearUserList()
    window.localStorage.removeItem('loggedBloglistUser')
    window.location.href = '/'
  }



  // render
  if (props.user === null){
    return (
      <>
        <Notification />
        <Login />
      </>
    )
  }


  return (
    <>
      <Router>
        <Menu username={props.user.name} handleLogout={handleLogout} />

        <Header as='h2' icon textAlign='center'>
          <Icon name='coffee' circular />
          <Header.Content>The blog app</Header.Content>
        </Header>

        <Notification />

        <Route exact path="/users" render={() =>
          <Users />
        } />

        <Route exact path="/users/:id" render={({ match }) =>
          <User id={match.params.id} />
        } />

        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog id={match.params.id} />
        } />

        <Route exact path="/" render={() =>
          <>
            <BlogList />

            <Togglable buttonLabel="create new">
              <AddNewBlog />
            </Togglable>
          </>
        } />

      </Router>
    </>
  )
}



const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}



export default connect(
  mapStateToProps,
  {
    initializeBlogs,
    clearBlogs,
    initUser,
    exitUser,
    initUserList,
    clearUserList
  }
)(App)
