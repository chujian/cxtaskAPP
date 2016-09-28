import React,{ Component } from 'react';

import { connect } from 'react-redux';

import TaskAdd from '../Components/Task/TaskAdd';

class TaskAddConstanter extends React.Component {
  render() {
    return (
      <TaskAdd {...this.props} />
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

export default connect(mapStateToProps)(TaskAddConstanter)
