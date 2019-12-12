import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'


const Users = (props) => (
  <>
    <h2>Users</h2>

    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>username</Table.HeaderCell>
          <Table.HeaderCell>blogs created</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.userList.map(user =>
          <Table.Row key={user.id}>
            <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
            <Table.Cell>{user.blogs.length}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
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