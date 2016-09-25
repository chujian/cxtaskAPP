import React,{ Component } from 'react';

import { connect } from 'react-redux';

import TaskDetail from '../Components/TaskDetail';

class TaskDetailConstanter extends React.Component {
  render() {
    return (
      <TaskDetail {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,task,employee} = state;
  return {
    user,
    task,
    employee,
  }
}

export default connect(mapStateToProps)(TaskDetailConstanter)
