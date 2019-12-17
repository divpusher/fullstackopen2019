import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const AddNewBlog = (props) => {

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')


  const handleAddNewBlog = async (event) => {
    event.preventDefault()


    try{

      props.addBlog({
        title: title.attributes.value,
        author: author.attributes.value,
        url: url.attributes.value
      })

      props.setNotification(
        `a new blog ${title.attributes.value} by ${author.attributes.value} added`,
        'success'
      )

      title.reset()
      author.reset()
      url.reset()


    } catch (exception) {
      props.setNotification('Couldn\'t add new blog', 'error')
    }
  }

  return (
    <form onSubmit={handleAddNewBlog}>
      <div>title:<input data-cy="title" {...title.attributes} /></div>
      <div>author:<input data-cy="author" {...author.attributes}  /></div>
      <div>url:<input data-cy="url" {...url.attributes}  /></div>
      <div><button type="submit" data-cy="submit">create</button></div>
    </form>
  )
}


const ConnectedAddNewBlog = connect(
  null,
  {
    addBlog,
    setNotification
  }
)(AddNewBlog)

export default ConnectedAddNewBlog