import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const BlogList = (props) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <>
      {props.visibleBlogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </>
  )
}


const blogsToShow = ({ blogs }) => {
  const sortedBlogs = new Array(...blogs)
  sortedBlogs.sort((a, b) => b.likes - a.likes)
  return sortedBlogs
}


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    visibleBlogs: blogsToShow(state)
  }
}


const ConnectedBlogList = connect(
  mapStateToProps
)(BlogList)

export default ConnectedBlogList
