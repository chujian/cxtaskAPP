import React,{ Component } from 'react';

import { connect } from 'react-redux';

import Login from '../Components/Login';

class LoginConstanter extends React.Component {
  render() {
    return (
      <Login {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user} = state;
  return {
    user,
  }
}

export default connect(mapStateToProps)(LoginConstanter)
