import React,{ Component } from 'react';

import { connect } from 'react-redux';

import CommentList from '../Components/CommentList';

class CommentListConstanter extends React.Component {
  render() {
    return (
      <CommentList {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,comment} = state;
  return {
    user,
    comment,
  }
}

export default connect(mapStateToProps)(CommentListConstanter)
