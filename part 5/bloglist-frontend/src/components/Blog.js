import React, { useState } from 'react'


const Blog = ({ blog }) => {
  
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let visibility = { display: visible ? '' : 'none' }

  

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()}>
        {blog.title} {blog.author}

        <div style={visibility}>
          <div>{blog.likes} likes <button>like</button></div>
          <div>added by {blog.user.name}</div>
        </div>
      </div>
    </div>
  )

}


export default Blog