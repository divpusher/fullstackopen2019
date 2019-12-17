import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { List } from 'semantic-ui-react'



const BlogList = (props) => {

  return (
    <>
      <h2>Blogs</h2>
      <List divided relaxed>
        {props.visibleBlogs.map(blog =>
          <List.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} from {blog.author}</Link>
          </List.Item>
        )}
      </List>
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
