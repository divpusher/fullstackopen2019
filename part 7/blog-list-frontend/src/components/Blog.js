import React from 'react'
import { connect } from 'react-redux'
import { like, addComment } from '../reducers/blogReducer'


const Blog = (props) => {

  if ( props.blog === undefined) {
    return null
  }


  const handleCommentSubmit = (e) => {
    e.preventDefault()

    props.addComment(props.blog.id, e.target.comment.value)

    e.target.comment.value = ''
  }



  return (
    <>
      <h2>{props.blog.title} by {props.blog.author}</h2>
      <div><a href={props.blog.url} target="_blank" rel="noopener noreferrer">{props.blog.url}</a></div>
      <div>{props.blog.likes} likes <button data-cy="like" onClick={() => props.like(props.blog.id, props.blog)}>like</button></div>
      <div>added by {props.blog.user.name}</div>
      <p>&nbsp;</p>

      <h3>comments</h3>
      <form onSubmit={(e) => handleCommentSubmit(e)}>
        <input type="text" data-cy="comment" name="comment" />
        <button type="submit" data-cy="submit">add comment</button>
      </form>
      <ul>{props.blog.comments.map(c =>
        <li key={c.id}>{c.comment}</li>
      )}
      </ul>
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
    like,
    addComment
  }
)(Blog)

export default ConnectedBlog