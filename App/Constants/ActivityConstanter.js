import React,{ Component } from 'react';

import { connect } from 'react-redux';

import Activity from '../Components/Myworks/activity/MyActivity';

class ActivityConstanter extends React.Component {
  render() {
    return (
      <Activity {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,activity} = state;
  return {
    user,
    activity
  }
}

export default connect(mapStateToProps)(ActivityConstanter)
