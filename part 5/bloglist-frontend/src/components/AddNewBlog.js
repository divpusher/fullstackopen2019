import React from 'react'


const AddNewBlog = ({ handleAddNewBlog, newBlog, setNewBlog }) => (
  <form onSubmit={handleAddNewBlog}>
    <div>title:<input value={newBlog.title} onChange={({ target }) => setNewBlog({...newBlog, title: target.value})} type="text" /></div>
    <div>author:<input value={newBlog.author} onChange={({ target }) => setNewBlog({...newBlog, author: target.value})} type="text" /></div>
    <div>url:<input value={newBlog.url} onChange={({ target }) => setNewBlog({...newBlog, url: target.value})} type="text" /></div>
    <div><button type="submit">create</button></div>
  </form>
)


export default AddNewBlog