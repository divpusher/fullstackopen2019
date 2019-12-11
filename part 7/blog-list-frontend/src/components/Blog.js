import React from 'react'
import { connect } from 'react-redux'
import { like } from '../reducers/blogReducer'


const Blog = (props) => {

  if ( props.blog === undefined) {
    return null
  }

  return (
    <>
      <h2>{props.blog.title} by {props.blog.author}</h2>
      <div><a href={props.blog.url} target="_blank" rel="noopener noreferrer">{props.blog.url}</a></div>
      <div>{props.blog.likes} likes <button onClick={() => props.like(props.blog.id, props.blog)}>like</button></div>
      <div>added by {props.blog.user.name}</div>
    </>
  )

}


const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id)
  }
}


const ConnectedBlog = connect(
  mapStateToProps,
  {
    like
  }
)(Blog)

export default ConnectedBlog