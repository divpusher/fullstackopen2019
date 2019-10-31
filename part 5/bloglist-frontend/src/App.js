import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import loginService from './services/login' 
import blogService from './services/blogs' 



function App() {
  // const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])



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
      console.log('error')
    }
  }



  if (user === null){
    return (
      <>
        <h2>log in to application</h2>        
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
      
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}


export default App;
