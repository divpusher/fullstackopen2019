import React from 'react'
import { connect } from 'react-redux'


const Users = (props) => (
  <>
    <h2>Users</h2>
    <table>
      <thead><tr><td></td><td>blogs created</td></tr></thead>
      <tbody>
        {props.userList.map(user =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  </>
)


const mapStateToProps = (state) => {
  return {
    userList: state.userList
  }
}


export default connect(
  mapStateToProps
)(Users)