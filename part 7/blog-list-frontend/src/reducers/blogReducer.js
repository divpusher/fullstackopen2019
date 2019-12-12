import blogService from '../services/blogs'



export const initializeBlogs = () => {
  console.log('fetch bloglist')
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}



export const clearBlogs = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_BLOGS'
    })
  }
}



export const addBlog = (newObject) => {
  return async (dispatch, getState) => {
    const state = getState()
    blogService.setToken(state.user.token)
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}



export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    blogService.setToken(state.user.token)
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}



export const like = (id, newObject) => {
  return async (dispatch, getState) => {
    const state = getState()
    newObject.likes += 1
    blogService.setToken(state.user.token)
    const updatedBlog = await blogService.update(id, newObject)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}



export const addComment = (id, comment) => {
  return async (dispatch, getState) => {
    const state = getState()
    blogService.setToken(state.user.token)
    const addedComment = await blogService.comment(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: {
        blogId: id,
        comment: comment,
        commentId: addedComment.id
      }
    })
  }
}



const blogReducer = (state = [], action) => {
  // console.log('blogReducer is called', state, action)

  switch (action.type) {

    case 'INIT_BLOGS':
      return action.data


    case 'CLEAR_BLOGS':
      return []


    case 'LIKE_BLOG':
      const updatedBlogId = action.data.id
      return state.map(b =>
        b.id === updatedBlogId ? action.data : b
      )


    case 'REMOVE_BLOG':
      return state.filter(b =>
        b.id !== action.data
      )


    case 'NEW_BLOG':
      return [...state, action.data]


    case 'NEW_COMMENT':
      const blogId = action.data.blogId
      const comment = action.data.comment
      const commentId = action.data.commentId

      const blogToChange = state.find(b => b.id === blogId)
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat({
          comment: comment,
          id: commentId
        })
      }

      return state.map(blog =>
        blog.id !== blogId ? blog : changedBlog
      )


    default:
      return state
  }

}


export default blogReducer