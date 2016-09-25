import React,{ Component } from 'react';

import { connect } from 'react-redux';

import TaskLevel from '../Components/TaskLevel';

class TaskLevelConstanter extends React.Component {
  render() {
    return (
      <TaskLevel {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,task} = state;
  return {
    user,
    task,
  }
}

export default connect(mapStateToProps)(TaskLevelConstanter)
