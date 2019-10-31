import React, { useState } from 'react'
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



  const handleLogin = async (event) => {    
    event.preventDefault()    

    try {
      const user = await loginService.login({
        username, password,
      })

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
      
      <p>{user.name} logged in</p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}


export default App;
