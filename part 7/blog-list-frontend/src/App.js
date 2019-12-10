import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import AddNewBlog from './components/AddNewBlog'
import Togglable from './components/Togglable'
import { initializeBlogs, clearBlogs } from './reducers/blogReducer'
import { initUser, exitUser } from './reducers/userReducer'



const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (props.user === null && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      props.initUser(user)

      props.initializeBlogs()
    }
    console.log('first render')
  }, [props])



  const handleLogout = (event) => {
    event.preventDefault()
    props.exitUser()
    props.clearBlogs()
    window.localStorage.removeItem('loggedBloglistUser')
  }



  // render
  if (props.user === null){
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
        <Login />
      </>
    )
  }


  return (
    <>
      <h2>blogs</h2>

      <Notification />

      <p>{props.user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      <Togglable buttonLabel="new note">
        <AddNewBlog />
      </Togglable>

      <p>&nbsp;</p>

      <BlogList />
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
    exitUser
  }
)(App)
