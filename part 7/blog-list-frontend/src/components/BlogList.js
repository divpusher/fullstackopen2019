import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'



const BlogList = (props) => (
  <>
    {props.visibleBlogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
      />
    )}
  </>
)



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
