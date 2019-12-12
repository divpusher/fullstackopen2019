import React from 'react'
import { connect } from 'react-redux'

import { Message } from 'semantic-ui-react'

const Notification = (props) => {

  if (props.notification === null){
    return null
  }


  let inputProps = {
    positive: (props.notification.type === 'success') ? true : false,
    negative: (props.notification.type !== 'success') ? true : false
  }

  return (
    <Message {...inputProps}>
      {props.notification.message}
    </Message>
  )

}



const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}



export default connect(
  mapStateToProps
)(Notification)