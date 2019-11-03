import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddNewBlog from './components/AddNewBlog'
import Togglable from './components/Togglable'
import loginService from './services/login' 
import blogService from './services/blogs' 



function App() {
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON) 

      setUser(user)  

      ;(async () => {
        const blogsAll = await blogService.getAll()
        setBlogs(blogsAll)
      })() 
    }
  }, [])



  const handleLogout = (event) => {   
    event.preventDefault()
    setUser(null)
    setBlogs([])
    window.localStorage.removeItem('loggedBloglistUser')
  }



  const handleLogin = async (event) => {    
    event.preventDefault()    

    try {

      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(        
        'loggedBloglistUser', JSON.stringify(user)      
      ) 

      setUser(user)
      setUsername('')
      setPassword('')

      const blogsAll = await blogService.getAll()
      setBlogs(blogsAll)

    } catch (exception) {

      setMessage({
        text: `wrong username or password`,
        type: 'error'
      })

      setTimeout(() => {          
        setMessage(null)
      }, 3000)

    }
  }



  const handleAddNewBlog = async (event) => {
    event.preventDefault()

    try{

      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(returnedBlog))      
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })

      setMessage({
        text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: 'success'
      })

      setTimeout(() => {          
        setMessage({ text: '', type: '' })
      }, 3000)

    } catch (exception) {

      setMessage({
        text: `Couldn't add new blog`,
        type: 'error'
      })

      setTimeout(() => {          
        setMessage(null)
      }, 3000)

    }
  }



  // render
  if (user === null){
    return (
      <>
        <h2>log in to application</h2>     
        <Notification message={message} />   
        <Login 
        handleLogin={handleLogin}
        username={username} 
        password={password} 
        setUsername={setUsername}
        setPassword={setPassword}
        /> 
      </>
    )
  }
      

  return (     
    <>
      <h2>blogs</h2>

      <Notification message={message} />
      
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      <Togglable buttonLabel="new note">
        <AddNewBlog 
          handleAddNewBlog={handleAddNewBlog} 
          newBlog={newBlog}
          setNewBlog={setNewBlog}
        />
      </Togglable>

      <p>&nbsp;</p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}


export default App;
