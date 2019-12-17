import React from 'react'
import { Link } from 'react-router-dom'
import { Menu as SMenu, Segment } from 'semantic-ui-react'


let Menu = (props) => {

  return (
    <Segment inverted>
      <SMenu inverted secondary>
        <SMenu.Item
          as={Link} to="/"
          name="blogs"
        />
        <SMenu.Item
          as={Link} to="/users/"
          name="users"
        />

        <SMenu.Menu position='right'>
          <SMenu.Item>
            {props.username} is logged in
          </SMenu.Item>
          <SMenu.Item
            name="logout"
            data-cy="logout"
            onClick={() => props.handleLogout() }
          />
        </SMenu.Menu>
      </SMenu>
    </Segment>
  )

}

export default Menu