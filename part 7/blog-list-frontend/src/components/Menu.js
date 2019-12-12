import React from 'react'
import { Link } from 'react-router-dom'


let Menu = (props) => {

  return (
    <div className="menu">
      <Link to="/">blogs</Link>
      <Link to="/users/">users</Link>
      {props.username} is logged in&nbsp;
      <button onClick={() => props.handleLogout() }>logout</button>
    </div>
  )

}

export default Menu