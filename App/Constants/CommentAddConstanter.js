import React,{ Component } from 'react'

import { connect } from 'react-redux'

import CommentAdd from '../Components/Comment/CommentAdd'

class CommentAddConstanter extends Component {
  render(){
    return (
      <CommentAdd {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,task,comment} = state;
  return {
    user,
    task,
    comment,
  }
}

export default connect(mapStateToProps)(CommentAddConstanter)
