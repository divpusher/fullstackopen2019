import React, { useState } from 'react'
import { connect } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const Blog = (props) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  let visibility = { display: visible ? '' : 'none' }



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        props.removeBlog(blog.id)
      } catch (exception) {
        setNotification(`Couldn't remove this blog!`, 'error')
      }
    }
  }





  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()} className="title">{props.blog.title} {props.blog.author}</div>

      <div style={visibility} className="details">
        <div>{props.blog.likes} likes <button onClick={() => props.like(props.blog.id, props.blog)}>like</button></div>
        <div>added by {props.blog.user.name}</div>
        {
          props.user.username === props.blog.user.username ?
            <button onClick={() => handleRemoveBlog(props.blog)}>remove</button>
            : null
        }
      </div>
    </div>
  )

}



const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}



const ConnectedBlog = connect(
  mapStateToProps,
  {
    like,
    setNotification,
    removeBlog
  }
)(Blog)

export default ConnectedBlog